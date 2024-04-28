import { useMutation } from '@apollo/client'
import { Button, Input, Navbar, NavbarBrand, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputPlace, PlacesResponse, Prefecture } from '@/Types'
import { CREATE_PLACE } from '@/graphql/createPlaces'
import { GET_PLACES } from '@/graphql/getPlaces'
import { GET_PREFECTURES } from '@/graphql/getPrefecture'
import { createApolloClient } from '@/libs/client'
import { MdCancel } from "react-icons/md"
import { IoIosSend } from "react-icons/io"
import { TbFish } from "react-icons/tb"
import { GiBoatFishing } from "react-icons/gi"


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
      router.push('/place')
    } catch (error) {
      console.error('Error creating place:', error)
    }
  }

  return (
    <div>
      <header className='bg-gray-900 py-4 mb-8 w-full'>
        <div className='container'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
              <h1 className='text-white text-3xl font-bold'>
                <TbFish />Fishing Spots</h1>
            </NavbarBrand>
          </Navbar>
        </div>
      </header>
      <form className='container max-w-3lg mx-auto'>
        <div className='flex items-center justify-center'>
          <h1 className='text-center text-4xl font-bold mb-3'>
            Fishing spot entry
          </h1>
          <GiBoatFishing className='ml-2' size={32} />
        </div>
        <h2 className='text-center text-mx mb-20'>釣り場を入力してください</h2>
        <div className='container mx-auto'>
          <Table className='shadow-lg mb-10' hideHeader removeWrapper aria-label='Example static collection table'>
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
                    label="Port name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className='w-full mt-2'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg'>都道府県</label>
                  {errors.prefectureId && <span className='text-red-500'>{errors.prefectureId.message}</span>}
                </TableCell>
                <TableCell className='border-t border-b border-gray-300 w-3/4'>
                  <Select
                    label='Select prefecture'
                    {...register('prefectureId', { required: '都道府県は必須です' })}
                    className='w-full mt-2'
                  >
                    {data.prefectures.map((prefecture) => (
                      //prefecturesData?.prefecturesがundefinedの場合、空の配列を返す
                      <SelectItem key={prefecture.id} value={prefecture.id}>
                        {prefecture.name}
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className='mt-16 text-center'>
          <Link href={'/place'} passHref legacyBehavior>
            <Button color='default' variant='shadow' size='lg' className='mr-10'>
              <MdCancel />
              キャンセル
            </Button>
          </Link>
          <Button color='primary' variant='shadow' size='lg' onClick={handleSubmit(onSubmit)}>
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
