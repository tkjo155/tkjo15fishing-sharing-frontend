
import { useMutation } from '@apollo/client'
import { Button, Checkbox, Input, Navbar, NavbarBrand, Radio, RadioGroup } from '@nextui-org/react'
import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FishLog, InputFishLog} from '@/Types'
import { CREATE_FISHLOG } from '@/graphql/createFishlog'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface FishLogFormProps {
  data: {
    prefectures: FishLog
  }
}

const FishLogForm = ({ data }: FishLogFormProps) => {
  //釣行記録情報登録
  const [createFishlog] = useMutation(CREATE_FISHLOG)
  //日にちの状態管理
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  //魚の名前の状態管理
  const [inputFishName, setInputFishName] = useState('')
  //天気の状態管理
  const [inputWeather, setInputWeather] = useState('')
  //大きさの状態管理
  const [inputFishSize, setInputFishSize] = useState('')

  //FishLogの型でバリデーション
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFishLog>()

  //完了ボタンを押したらデータ追加、画面遷移
  const onSubmit: SubmitHandler<InputFishLog> = async (formData) => {
    // selectedPrefecture が undefined の場合の処理

    try {
      // データ追加
      await createFishlog({
        variables: {
          create: {
            date: formData.date,
            fishName: formData.fishName,
            weather: formData.weather,
            size: formData.size,
            isSpringTide: formData.isSpringTide,
            isMiddleTide: formData.isMiddleTide,
            isNeapTide: formData.isNeapTide,
            isNagashio: formData.isNagashio,
            isWakashio: formData.isWakashio,
          },
        },
        // サーバーに変更を加えた後に UI を最新のデータで更新
        refetchQueries: [{ query: GET_FISHLOG }],
      })

      // 一覧画面に遷移
      router.push('/place/${data.getFishLogs[0].placeId}')
    } catch (error) {
      console.error('Error creating fishlog:', error)
    }
  }

  return (
    <form>
      <div>
        <header className='bg-sky-500'>
          <Navbar>
          <NavbarBrand >
            <p  className='text-4xl font-bold border-black text-white'>
              Fishing Spots
            </p>
          </NavbarBrand>
          </Navbar>
        </header>
        <h1 className='text-center text-2xl mt-4 mb-4'>釣行記録登録</h1>
        <div>
          <label className='text-lg'>日にち</label>
          {errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span>}
         <DatePicker
          selected={selectedDate}
          onChange={(date) => date && setSelectedDate(date)}
          className='w-96 my-5 border-2 border-gray-300 rounded-md p-2'
          dateFormat="yyyy/MM/dd"
         />
        </div>
        </div>
        <label className='text-lg'>魚の名前</label>
         {errors.fishName && <span style={{ color: 'red' }}>{errors.fishName.message}</span>}
        <div>
          <Input
            {...register('fishName', {
              required: '魚名は必須です',
              maxLength: {
                value: 50,
                message: '魚名は20文字以内で入力してください',
              },
            })}
            type='text'
            value={inputFishName}
            onChange={(e) => setInputFishName(e.target.value)}
            className='w-96 my-5'          />
         </div>
         <label className='text-lg'>天気</label>
          {errors.weather && <span style={{ color: 'red' }}>{errors.weather.message}</span>}
         <div>
          <RadioGroup
          color="primary"
          defaultValue="晴れ"
          >
          <Radio value="晴れ">晴れ</Radio>
          <Radio value="曇り">曇り</Radio>
          <Radio value="雨">雨</Radio>
          </RadioGroup>
         </div>
         <label className='text-lg'>大きさ(cm)</label>
          {errors.size && <span style={{ color: 'red' }}>{errors.size.message}</span>}
         <div>
          <Input
            {...register('size', {
              required: '大きさは必須です',
              maxLength: {
                value: 10,
                message: '大きさは10文字以内で入力してください',
              },
            })}
            type='text'
            value={inputFishSize}
            onChange={(e) => setInputFishSize(e.target.value)}
            className='w-96 my-5'          />
        </div>
        <label className='text-lg'>潮汐情報</label>
        <div>
        <RadioGroup
          color="primary"
          defaultValue="大潮"
          >
          <Radio value="大潮">大潮</Radio>
          <Radio value="中潮">中潮</Radio>
          <Radio value="小潮">小潮</Radio>
          <Radio value="長潮">長潮</Radio>
          <Radio value="若潮">若潮</Radio>
          </RadioGroup>
        </div>
        <div className='mt-16 text-center'>
         <Link 
         href={'/place/${data.getFishLogs[0].placeId}'} 
         passHref 
         legacyBehavior>
        <Button color='default' variant='shadow' size='lg' className='mr-10'>
         キャンセル
        </Button>
        </Link>
        <Link href={'/place'} passHref legacyBehavior>
        <Button color='primary' variant='shadow' size='lg' onClick={handleSubmit(onSubmit)}>
          登録
        </Button>
        </Link>
      </div>
    </form>
  )
}


export default FishLogForm
