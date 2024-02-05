import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { InputPlace, Prefecture } from '@/Types'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Input, Navbar, NavbarBrand, Select, SelectItem } from '@nextui-org/react'
import { CREATE_PLACE } from '@/graphql/createPlaces'
import router from 'next/router'
import { GET_PLACES } from '@/graphql/getPlaces'
import { GET_PREFECTURES } from '@/graphql/getPrefecture'
import { createApolloClient } from '@/libs/client'
import Link from 'next/link'
import { GetStaticProps } from 'next'

interface PlaceRegistrationFormProps {
  data: {
    prefectures: Prefecture[]
  }
}

const PlaceRegistrationForm: React.FC<PlaceRegistrationFormProps> = ({ data }) => {
  //港情報登録
  const [createPlace] = useMutation(CREATE_PLACE)
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  //港名の状態管理
  const [inputName, setInputName] = useState('')

  //placeの型でバリデーション
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputPlace>()

  //[data]が変更された時だけ関数が発火する
  useEffect(() => {
    //初期位置データを取得
    const fetchInitialPrefectures = async () => {
      // データが prefecture プロパティを持つオブジェクトであると仮定
      const resultPrefectures: Prefecture[] = data?.prefectures || []
      // 取得した都道府県を状態に設定
      setPrefectures(resultPrefectures)
    }
    // コンポーネントがマウントされたとき、prefecture が変更されたときに fetchInitialPrefecture 関数を呼び出す
    fetchInitialPrefectures()
  }, [data])

  //完了ボタンを押したらデータ追加、画面遷移
  const onSubmit: SubmitHandler<InputPlace> = async (formData) => {
    try {
      //選択されたprefectureを取り出す
      const selectedPrefecture = data?.prefectures.find(
        (prefecture: Prefecture) => prefecture.id == formData.prefectureId,
      )

      // selectedPrefecture が undefined の場合の処理
      if (!selectedPrefecture) {
        console.error('Selected prefecture not found.')
        return // 処理を中断
      }

      // データ追加s
      createPlace({
        variables: {
          create: {
            name: formData.name,
            prefectureId: Number(selectedPrefecture.id),
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
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Select
          label='Select prefecture'
          className='max-w-xs'
          {...register('prefectureId', { required: '都道府県は必須です' })}
        >
          {(data?.prefectures! || []).map((prefecture: Prefecture) => (
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
export const getStaticProps: GetStaticProps<PlaceRegistrationFormProps> = async () => {
  const client = createApolloClient()
  //GraphQL クエリ ( GET_PREFECTURES) をサーバーに送信
  const { data } = await client.query({
    query: GET_PREFECTURES,
  })
  return {
    props: {
      data,
    },
  }
}

export default PlaceRegistrationForm
