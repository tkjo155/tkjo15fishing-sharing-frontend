import { useMutation } from '@apollo/client'
import { Button, Checkbox, CheckboxGroup, Input, Navbar, NavbarBrand, Radio, RadioGroup } from '@nextui-org/react'
import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { InputFishLog } from '@/Types'
import { CREATE_FISHLOG } from '@/graphql/createFishlog'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import { useRouter } from 'next/router'
import { DatePicker } from "@nextui-org/date-picker";
import { format } from 'date-fns';


const FishLogForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const [createFishlog] = useMutation(CREATE_FISHLOG)

  const { register, handleSubmit, clearErrors, watch, setValue, control, formState: { errors } } = useForm<InputFishLog>();

  const onSubmit: SubmitHandler<InputFishLog> = async (formData) => {
    try {
      await createFishlog({
        variables: {
          create: {
            placeId: Number(id),
            date: formData.date,
            image: "",
            fishName: formData.fishName,
            isSunny: formData.weather.includes('sunny'),
            isRainy: formData.weather.includes('rainy'),
            isCloudy: formData.weather.includes('cloudy'),
            size: Number(formData.size),
            tide: formData.tide,
          },
        },
        refetchQueries: [{ query: GET_FISHLOG }],
      });
      router.push(`/place/${id}`);
    } catch (error) {
      console.error('Error creating fishlog:', error);
    }
  };

  return (
    <form className='mx-auto max-w-lg mt-8'>
      <header className='bg-gray-900 py-4 mb-8 rounded-t-lg'>
        <div className='container mx-auto'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
              <h1 className='text-white text-4xl font-bold px-6'>Fishing Spots</h1>
            </NavbarBrand>
          </Navbar>
        </div>
      </header>
      <h1 className='text-center text-2xl mb-4'>釣行記録登録</h1>
      <div className='mb-4'>
        <label className='text-lg'>日にち</label>
        {errors.date && <span className='text-red-500 ml-2'>{errors.date.message}</span>}
        <DatePicker
          {...register('date', {
            required: '日にちは必須です'
          })}
          label="Fishing date"
          className="max-w-[280px]"
          onChange={(date) => {
            setValue('date', date ? date.toString() : '');
            clearErrors('date');
          }}
        />
      </div>
      <div className='mb-4'>
        <label className='text-lg'>魚の名前</label>
        {errors.fishName && <span className='text-red-500 ml-2'>{errors.fishName.message}</span>}
        <Input
          {...register('fishName', {
            required: '魚名は必須です',
            maxLength: {
              value: 20,
              message: '魚名は20文字以内で入力してください',
            },
          })}
          type='text'
          className='w-full mt-2'
        />
      </div>
      <div className='mb-4'>
        <label className='text-lg'>天気</label>
        {errors.weather && <span className='text-red-500 ml-2'>少なくとも1つの天気を選択してください</span>}
      </div>
      <div className='mb-4'>
        <Controller
          name='weather'
          control={control}
          render={({ field }) => (
            <CheckboxGroup {...field}>
              <Checkbox value='sunny'>晴れ</Checkbox>
              <Checkbox value='rainy'>雨</Checkbox>
              <Checkbox value='cloudy'>曇り</Checkbox>
            </CheckboxGroup>
          )}
          rules={{ required: true }}
        />
      </div>
      <div className='mb-4'>
        <label className='text-lg'>大きさ(cm)</label>
        {errors.size && <span className='text-red-500 ml-2'>{errors.size.message}</span>}
        <Input
          {...register('size', {
            required: '大きさは必須です',
            max: {
              value: 100,
              message: '大きさは100㎝以内で入力してください',
            },
          })}
          type='number'
          className='w-full mt-2'
        />
      </div>
      <div className='mb-4'>
        <label className='text-lg'>潮汐情報</label>
        {errors.tide && <span className='text-red-500 ml-2'>{errors.tide.message}</span>}
        <RadioGroup
          value={watch('tide')}
          name='tide'
          className='flex flex-col mt-2'
          onChange={(e) => {
            const selectedValue = e.target.value;
            setValue('tide', selectedValue);
            clearErrors('tide');
          }}
        >
          <Radio value='大潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2'>大潮</Radio>
          <Radio value='中潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2'>中潮</Radio>
          <Radio value='小潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2'>小潮</Radio>
          <Radio value='長潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2'>長潮</Radio>
          <Radio value='若潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2'>若潮</Radio>
        </RadioGroup>
      </div>
      <div className='text-center'>
        <Link href={`/place/${id}`} passHref>
          <Button color='default' variant='shadow' size='lg' className='mr-4 mt-8'>
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
