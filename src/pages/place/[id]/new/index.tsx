
import { useMutation } from '@apollo/client'
import { Button, Input, Navbar, NavbarBrand, Radio, RadioGroup } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputFishLog} from '@/Types'
import { CREATE_FISHLOG } from '@/graphql/createFishlog'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import { useRouter } from 'next/router';
import {Checkbox} from "@nextui-org/react";

const FishLogForm = () => {
  const router = useRouter();
  const {id}  = router.query;

  //釣行記録情報登録
  const [createFishlog] = useMutation(CREATE_FISHLOG)
  //日にちの状態管理
  const [inputDate, setInputDate] = useState('');
  //魚の名前の状態管理
  const [inputFishName, setInputFishName] = useState('')
  //天気の状態管理
  const [isSunny, setIsSunny] = useState(true);
  const [isRainy, setIsRainy] = useState(false);
  const [isCloudy, setIsCloudy] = useState(false);
  //釣行情報の状態管理
  const [inputTide, setInputTide] = useState('大潮');
  //大きさの状態管理
  const [inputFishSize, setInputFishSize] = useState(0)
  // 画像の状態管理
  const [image, setImage] = useState('');

 // 天気の選択状態の管理
 const [selectedWeather, setSelectedWeather] = useState<string[]>([]);
 // 天気のチェックボックスの値が変更されたときに呼び出される関数
 const handleWeatherChange = (value: string) => {
   // 選択されている天気を更新
   setSelectedWeather((prevSelectedWeather) => {
     // 選択されていない場合は追加し、選択されている場合は削除
     if (prevSelectedWeather.includes(value)) {
       return prevSelectedWeather.filter((weather) => weather !== value);
     } else {
       return [...prevSelectedWeather, value];
     }
   });
 };
 // 天気のバリデーションルール
 const validationRules = {
   validate: () => selectedWeather.length > 0 || '天気を少なくとも1つ選択してください',
 };


  //FishLogの型でバリデーション
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFishLog>()
  

  //完了ボタンを押したらデータ追加、画面遷移
  const onSubmit: SubmitHandler<InputFishLog> = async (formData) => {

    try {
      // データ追加
      await createFishlog({
        variables: {
          create: {
            placeId: Number(id),
            date: formData.date,
            image:image,
            fishName: formData.fishName,
            isSunny: isSunny, 
            isRainy: isRainy,
            isCloudy: isCloudy,
            size: inputFishSize,
            tide: inputTide,
          },
        },
        // サーバーに変更を加えた後に UI を最新のデータで更新
        refetchQueries: [{ query: GET_FISHLOG }],
      })

      // 一覧画面に遷移
      router.push(`/place/${id}`)
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
          <Input
            {...register('date', {
              required: '日にちは必須です',
              maxLength: {
                value: 15,
                message: '日にちは15文字以内で入力してください',
              },
            })}
            type='text'
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className='w-96 my-5'         
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
            className='w-96 my-5'         
            />
         </div>
         <label className='text-lg'>天気</label>
         {errors.isSunny && <span style={{ color: 'red' }}>{errors.isSunny.message}</span>}
         <div>
         <Checkbox
          {...register('isSunny', validationRules)}
           checked={selectedWeather.includes('sunny')}
           onChange={() => handleWeatherChange('sunny')}
         >
         晴れ
        </Checkbox>
        <Checkbox
         {...register('isRainy', validationRules)}
         checked={selectedWeather.includes('rainy')}
         onChange={() => handleWeatherChange('rainy')}
        >
        雨
       </Checkbox>
       <Checkbox
         {...register('isCloudy', validationRules)}
         checked={selectedWeather.includes('cloudy')}
         onChange={() => handleWeatherChange('cloudy')}
        >
       曇り
       </Checkbox>
         </div>
         <label className='text-lg'>大きさ(cm)</label>
          {errors.size && <span style={{ color: 'red' }}>{errors.size.message}</span>}
         <div>
          <Input
            {...register('size', {
              required: '大きさは必須です',
              min: {
                value: 1,
                message: '大きさは1以上で入力してください',
              },
              max: {
                value: 10,
                message: '大きさは10文字以内で入力してください',
              },
            })}
            type='number' 
            value={inputFishSize.toString()} // 数値型を文字列型に変換
            onChange={(e) => setInputFishSize(parseInt(e.target.value))} // 文字列型を数値型に変換して状態を更新
            className='w-96 my-5'         
             />
        </div>
        <label className='text-lg'>潮汐情報</label>
        <div>
        <RadioGroup 
         color="primary"
         value={inputTide} // ラジオボタンの選択された値を表示 
         onChange={(event) => {
          setInputTide(event.target.value);
           }}
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
         href={`/place/${id}`} 
         passHref 
         legacyBehavior>
        <Button color='default' variant='shadow' size='lg' className='mr-10'>
         キャンセル
        </Button>
        </Link>
        <Button color='primary' variant='shadow' size='lg' onClick={handleSubmit(onSubmit)}>
          登録
        </Button>
      </div>
    </form>
  )
}


export default FishLogForm
