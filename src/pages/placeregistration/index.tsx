import { SubmitHandler, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Places } from '@/Types'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Input, Navbar, NavbarBrand, Select, SelectItem } from '@nextui-org/react'
import { CREATE_PLACE } from '@/graphql/createPlaces'
import router, { useRouter } from 'next/router'
import { GET_PLACES } from '@/graphql/getPlaces'
import { client } from '../_app'

type PlaceInputProps = {
  places: Places[]
  setPlaces: React.Dispatch<React.SetStateAction<Places[]>>
}

interface FormData {
  inputName: string
  selectedPrefecture: string
}

const PlaceRegistrationForm = () => {
  const [createPlace] = useMutation(CREATE_PLACE)
  const [inputTitle, setInputTitle] = useState('')
  const [prefectures, setPrefectures] = useState<Places[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({})

  //完了ボタンを押したらデータ追加
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const newPlace: Places = {
      id: prefectures.length + 1,
      name: formData.inputName,
      prefectureId: parseInt(formData.selectedPrefecture),
    }
    try {
      await createPlace({
        variables: {
          create: {
            name: newPlace.name,
            prefectureId: newPlace.prefectureId,
          },
        },
        refetchQueries: [{ query: GET_PLACES }],
      })
      // 一覧画面に遷移
      router.push('/placeslist')
    } catch (error) {
      console.error('Error creating place:', error)
    }
  }

  return (
    <form>
      <div>
        <header className='text-gray-600 body-font'>
          <Navbar style={{ backgroundColor: '#3498db' }}>
            <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
              <p className='font-bold text-white' style={{ fontSize: '30px' }}>
                Fishing Spots
              </p>
            </NavbarBrand>
          </Navbar>
        </header>
        <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣り場登録</h1>
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <label style={{ fontSize: '18px', display: 'block' }}>港名</label>

          {errors.inputName && <span style={{ color: 'red' }}>{errors.inputName.message}</span>}
          <Input
            {...register('inputName', {
              required: '港名は必須です',
              maxLength: {
                value: 50,
                message: '港名は50文字以内で入力してください',
              },
            })}
            type='text'
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            style={{ width: '600px', margin: '5px 0 10px 0' }}
          />
        </div>
      </div>
      <label style={{ fontSize: '18px', display: 'block', marginTop: '30px' }}>都道府県</label>
      {errors.selectedPrefecture && (
        <span style={{ color: 'red' }}>{errors.selectedPrefecture.message}</span>
      )}
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Select
          label='Select prefecture'
          className='max-w-xs'
          {...register('selectedPrefecture', { required: '都道府県は必須です' })}
        >
          {prefectures.map((prefecture) => (
            <SelectItem key={prefecture.id}>{prefecture.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Button
          color='default'
          variant='shadow'
          size='lg'
          style={{ marginRight: '50px' }}
          onClick={() => router.push('/placeslist')}
        >
          キャンセル
        </Button>
        <Button color='primary' variant='shadow' size='lg' onClick={handleSubmit(onSubmit)}>
          完了
        </Button>
      </div>
    </form>
  )
}

export default PlaceRegistrationForm
