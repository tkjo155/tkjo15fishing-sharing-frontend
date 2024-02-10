import { useMutation } from '@apollo/client'
import { Button, Input, Navbar, NavbarBrand, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPlace, Prefecture } from '@/Types'
import { CREATE_PLACE } from '@/graphql/createPlaces'
import { GET_PLACES } from '@/graphql/getPlaces'
import { GET_PREFECTURES } from '@/graphql/getPrefecture'
import { createApolloClient } from '@/libs/client'

interface PlaceFormProps {
  data: {
    prefectures: Prefecture[]
  }
}

const PlaceForm = ({ data }: PlaceFormProps) => {
  //港情報登録
  const [createPlace] = useMutation(CREATE_PLACE)
  //港名の状態管理
  const [inputName, setInputName] = useState('')

  //placeの型でバリデーション
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputPlace>()

  //完了ボタンを押したらデータ追加、画面遷移
  const onSubmit: SubmitHandler<InputPlace> = async (formData) => {
    // selectedPrefecture が undefined の場合の処理

    try {
      // データ追加
      await createPlace({
        variables: {
          create: {
            name: formData.name,
            prefectureId: Number(formData.prefectureId),
          },
        },
        // サーバーに変更を加えた後に UI を最新のデータで更新
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
        <header className='text-gray-600'>
          <Navbar style={{ backgroundColor: '#3498db' }}>
            <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
              <p className='font-bold text-white' style={{ fontSize: '30px' }}>
                Fishing Spots
              </p>
            </NavbarBrand>
          </Navbar>
        </header>
        <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣り場登録</h1>
        <div className='flex w-full flex-wrap gap-4 md:flex-nowrap'>
          <label style={{ fontSize: '18px', display: 'block' }}>港名</label>
          {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
          <Input
            {...register('name', {
              required: '港名は必須です',
              maxLength: {
                value: 50,
                message: '港名は50文字以内で入力してください',
              },
            })}
            type='text'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            style={{ width: '600px', margin: '5px 0 10px 0' }}
          />
        </div>
      </div>
      <label style={{ fontSize: '18px', display: 'block', marginTop: '30px' }}>都道府県</label>
      {errors.prefectureId && <span style={{ color: 'red' }}>{errors.prefectureId.message}</span>}
      <div className='flex w-full flex-wrap gap-4 md:flex-nowrap'>
        <Select
          label='Select prefecture'
          className='max-w-xs'
          {...register('prefectureId', { required: '都道府県は必須です' })}
        >
          {data.prefectures.map((prefecture) => (
            //prefecturesData?.prefecturesがundefinedの場合、空の配列を返す
            <SelectItem key={prefecture.id} value={prefecture.id}>
              {prefecture.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Link href={'/placeslist'} passHref legacyBehavior>
          <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
            キャンセル
          </Button>
        </Link>
        <Button color='primary' variant='shadow' size='lg' onClick={handleSubmit(onSubmit)}>
          完了
        </Button>
      </div>
    </form>
  )
}

//ビルド時にページを事前レンダリング
export const getStaticProps = async () => {
  const client = createApolloClient()
  //GraphQL クエリ ( GET_PREFECTURES) をサーバーに送信
  const { data } = await client.query<PlaceFormProps>({
    query: GET_PREFECTURES,
  })
  return {
    props: {
      data,
    },
  }
}

export default PlaceForm
