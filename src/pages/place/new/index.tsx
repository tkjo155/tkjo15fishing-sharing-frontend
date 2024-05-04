import { useMutation } from '@apollo/client'
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPlace, PlacesResponse, Prefecture } from '@/Types'
import { CREATE_PLACE } from '@/graphql/createPlaces'
import { GET_PLACES } from '@/graphql/getPlaces'
import { GET_PREFECTURES } from '@/graphql/getPrefecture'
import { UPDATE_PLACE } from '@/graphql/updatePlace'
import { createApolloClient } from '@/libs/client'
import { MdCancel } from 'react-icons/md'
import { IoIosSend } from 'react-icons/io'
import { TbFish } from 'react-icons/tb'
import { GiBoatFishing } from 'react-icons/gi'

interface PlaceFormProps {
  data: {
    prefectures: Prefecture[]
  }
}

const PlaceForm = ({ data }: PlaceFormProps) => {
  const router = useRouter()
  const { id, name, prefecture } = router.query
  const placeId = id
  //港情報登録
  const [createPlace] = useMutation(CREATE_PLACE)
  const [updatePlace] = useMutation(UPDATE_PLACE)
  //港名の状態管理
  const [inputName, setInputName] = useState('')
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<number>()
  const selectedPrefecture = data.prefectures.find((pref) => pref.name === prefecture)

  useEffect(() => {
    if (name) {
      setInputName(String(name))
    }
  }, [name])

  useEffect(() => {
    if (selectedPrefecture) {
      const prefectureId = data.prefectures.find(
        (prefecture) => prefecture.name === selectedPrefecture.name,
      )?.id
      if (prefectureId) {
        setSelectedPrefectureId(prefectureId)
      }
    }
  }, [selectedPrefecture, data.prefectures])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputPlace>({
    defaultValues: {
      name: String(name) || '', // nameがundefinedの場合は空文字を設定
    },
  });
  

  //完了ボタンを押したらデータ追加、画面遷移
  const onSubmit: SubmitHandler<InputPlace> = async (formData) => {
    try {
      if (placeId) {
        // idが定義されている場合、既存の場所を更新
        await updatePlace({
          variables: {
            edit: {
              id: placeId, 
              name: formData.name,
              prefectureId: Number(formData.prefectureId), 
            },
          },
          refetchQueries: [{ query: GET_PLACES }],
        })
      } else {
        // idが未定義の場合、新しい場所を作成
        await createPlace({
          variables: {
            create: {
              name: formData.name,
              prefectureId: Number(formData.prefectureId),
            },
          },
          refetchQueries: [{ query: GET_PLACES }],
        })
      }
      // 一覧画面に遷移
      router.push('/place')
    } catch (error) {
      console.error('Error creating place:', error)
    }
  }

  return (
    <div>
      <header className='bg-gray-900 py-4 mb-8 w-full'>
      <div className='container mx-auto'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
            <div className='flex items-center ml-1'>
                <TbFish className='text-white text-3xl mr-2' />
                <h1 className='text-white text-3xl font-bold ml-2'>Fishing Spots</h1>
              </div>
            </NavbarBrand>
          </Navbar>
        </div>
      </header>
      <form className='container max-w-3lg mx-auto'>
        <div className='flex items-center justify-center'>
          <h1 className='text-center text-4xl font-bold mb-3'>Fishing spot entry</h1>
          <GiBoatFishing className='ml-2 mb-3' size={32} />
        </div>
        <h2 className='text-center text-mx mb-20'>釣り場を入力してください</h2>
        <div className='container mx-auto'>
          <Table
            className='shadow-lg mb-10'
            hideHeader
            removeWrapper
            aria-label='Example static collection table'
          >
            <TableHeader>
              <TableColumn className='border-r'>項目</TableColumn>
              <TableColumn>情報</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='border-t-5 border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg'>港名</label>
                  {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </TableCell>
                <TableCell className='border-t-5 border-b border-gray-300 w-3/4'>
                  <Input
                    {...register('name', {
                      required: '港名は必須です',
                      maxLength: {
                        value: 50,
                        message: '港名は50文字以内で入力してください',
                      },
                    })}
                    type='text'
                    label='Port name'
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className='w-full mt-2'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg'>都道府県</label>
                  {errors.prefectureId && (
                    <span className='text-red-500'>{errors.prefectureId.message}</span>
                  )}
                </TableCell>
                <TableCell className='border-t border-b border-gray-300 w-3/4'>
                {(selectedPrefectureId !== undefined || !id) && (
                    <Select
                      label='Select prefecture'
                      {...register('prefectureId', { required: '都道府県は必須です' })}
                      {...(selectedPrefectureId !== undefined
                        ? { defaultSelectedKeys: [String(selectedPrefectureId)] }
                        : {})}                      
                        className='w-full mt-2'
                    >
                      {data.prefectures.map((prefecture) => (
                        <SelectItem key={prefecture.id} value={prefecture.id}>
                          {prefecture.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className='mt-16 text-center'>
          <Link href={'/place'} passHref legacyBehavior>
            <Button color='default' variant='shadow' size='sm' className='mt-20 mr-10 ml-10 mb-20'>
              <MdCancel />
              キャンセル
            </Button>
          </Link>
          <Button
            color='primary'
            variant='shadow'
            size='sm'
            className='mt-20 mr-10 ml-10 mb-20'
            onClick={handleSubmit(onSubmit)}
          >
            <IoIosSend />
            完了
          </Button>
        </div>
      </form>
    </div>
  )
}

//ビルド時にページを事前レンダリング
export const getStaticProps = async () => {
  const client = createApolloClient()
  //GraphQL クエリ ( GET_PREFECTURES) をサーバーに送信
  const { data, error } = await client.query<PlacesResponse>({
    query: GET_PREFECTURES,
  })
  console.error('Error fetching data:', error)
  return {
    props: {
      data,
    },
  }
}

export default PlaceForm
