
import { useMutation } from '@apollo/client'
import { Button, Input, Navbar, NavbarBrand, Radio, RadioGroup } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputFishLog} from '@/Types'
import { CREATE_FISHLOG } from '@/graphql/createFishlog'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import { useRouter } from 'next/router';

const FishLogForm = () => {
  const router = useRouter();
  const {id}  = router.query;

  interface Weather {
    id: string;
    name: string;
    checked: boolean;
    disabled: boolean;
  }

  //釣行記録情報登録
  const [createFishlog] = useMutation(CREATE_FISHLOG)

  const [weather, setWeather] = useState<Weather[]>([
      {
        id: "sunny",
        name: "晴れ",
        checked: false,
        disabled: false,
      },
      {
        id: "rainy",
        name: "雨",
        checked: false,
        disabled: false,
      },
      {
        id: "cloudy",
        name: "曇り",
        checked: false,
        disabled: false,
      },
    ]);

  const { register, handleSubmit, formState: { errors } } = useForm<InputFishLog>({ mode: "onChange" });
  
  // 完了ボタンを押したらデータ追加、画面遷移
  const onSubmit: SubmitHandler<InputFishLog> = async (formData) => {
    try {
      
      // データ追加
      await createFishlog({
        variables: {
          create: {
            placeId: Number(id),
            date: formData.date,
            image: "",
            fishName: formData.fishName,
            isSunny: Boolean(formData.weather.includes('sunny')),
            isRainy: Boolean(formData.weather.includes('rainy')),
            isCloudy: Boolean(formData.weather.includes('cloudy')),
            size: Number(formData.size),
            tide: formData.tide,
          },
        },
        // サーバーに変更を加えた後に UI を最新のデータで更新
        refetchQueries: [{ query: GET_FISHLOG }],
      });

      // 一覧画面に遷移
      router.push(`/place/${id}`);
    } catch (error) {
      console.error('Error creating fishlog:', error);
    }
  };


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
              value: 20,
              message: '魚名は20文字以内で入力してください',
            },
          })}
          type='text'
          className='w-96 my-5'
        />
         </div>
         <label className='text-lg'>天気</label>
         {errors.weather && <span style={{ color: 'red' }}>{errors.weather.message}</span>}
         <div>
           {weather.map((item) => (
         <div key={item.id}>
       <input
       id={item.id}
       type="checkbox"
       value={item.id}
       defaultChecked={item.checked}
       disabled={item.disabled}
       {...register("weather", {
        validate: {
        atLeastOneRequired: (value) =>
        value.length >= 1 || "1つ以上選択してください",
      },
      })}
      />
      <label htmlFor={item.id}>{item.name}</label>
      </div>
      ))}
         </div>
         <label className='text-lg'>大きさ(cm)</label>
          {errors.size && <span style={{ color: 'red' }}>{errors.size.message}</span>}
         <div>
          <Input
            {...register('size', {
              required: '大きさは必須です',
              min: {
                value: 20,
                message: '大きさは20㎝以上で入力してください',
              },
              max: {
                value: 100,
                message: '大きさは100㎝以内で入力してください',
              },
            })}
            type='number' 
            className='w-96 my-5'         
             />
        </div>
        <label className='text-lg'>潮汐情報</label>
        {errors.tide && <span style={{ color: 'red' }}>{errors.tide.message}</span>}
        <div>
        <RadioGroup 
          color="primary"
          {...register('tide', { 
            required: '潮汐情報は必須です' })} 
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
