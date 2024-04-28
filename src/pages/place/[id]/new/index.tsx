import { useMutation } from '@apollo/client'
import { Button, Checkbox, CheckboxGroup, Input, Navbar, NavbarBrand, Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { InputFishLog } from '@/Types'
import { CREATE_FISHLOG } from '@/graphql/createFishlog'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import { useRouter } from 'next/router'
import { DatePicker } from "@nextui-org/date-picker"
import { MdCancel } from "react-icons/md"
import { IoIosSend } from "react-icons/io"
import { TbFish } from "react-icons/tb"
import { PiFishSimpleDuotone } from "react-icons/pi"


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
            Fishing record entry
          </h1>
          <PiFishSimpleDuotone className='ml-2' size={32} />
        </div>
        <h2 className='text-center text-mx mb-20'>釣果データを入力してください</h2>
        <Table className='shadow-lg mb-10' hideHeader removeWrapper aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn className='border-r'>項目</TableColumn>
            <TableColumn>情報</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='border-t-5 border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                <label className='text-lg w-28'>日にち</label>
                {errors.date && <span className='text-red-500 ml-2'>{errors.date.message}</span>}
              </TableCell>
              <TableCell className='border-t-5 border-b border-gray-300 w-3/4'>
                <DatePicker
                  {...register('date', {
                    required: '日にちは必須です'
                  })}
                  label="Fishing date"
                  className='w-full mt-2'
                  onChange={(selectDate) => {
                    const date = `${selectDate.year}/${selectDate.month}/${selectDate.day}`;
                    setValue('date', date)
                    clearErrors('date');
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                <label className='text-lg w-28'>天気 <span className="text-red-500 text-sm">(複数選択可)</span></label>
                {errors.weather && <span className='text-red-500 ml-2'>天気は必須です</span>}
              </TableCell>
              <TableCell className='border-t border-b border-gray-300 w-3/4'>
                <Controller
                  name='weather'
                  control={control}
                  render={({ field }) => (
                    <CheckboxGroup {...field}>
                      <Checkbox value='sunny' className='mb-2 ml-1'>晴れ</Checkbox>
                      <Checkbox value='rainy' className='mb-2 ml-1'>雨</Checkbox>
                      <Checkbox value='cloudy' className='mb-2 ml-1'>曇り</Checkbox>
                    </CheckboxGroup>
                  )}
                  rules={{ required: true }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                <label className='text-lg w-28'>魚の名前</label>
                {errors.fishName && <span className='text-red-500 ml-2'>{errors.fishName.message}</span>}
              </TableCell>
              <TableCell className='border-t border-b border-gray-300 w-3/4'>
                <Input
                  {...register('fishName', {
                    required: '魚名は必須です',
                    maxLength: {
                      value: 20,
                      message: '魚名は20文字以内で入力してください',
                    },
                  })}
                  type='text'
                  label="Fish name"
                  className='w-full mt-2'
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                <label className='text-lg w-28'>大きさ<span className='text-red-500 text-sm'>(cm)</span></label>
                {errors.size && <span className='text-red-500 ml-2'>{errors.size.message}</span>}
              </TableCell>
              <TableCell className='border-t border-b border-gray-300 w-3/4'>
                <Input
                  {...register('size', {
                    required: '大きさは必須です',
                    max: {
                      value: 100,
                      message: '大きさは100㎝以内で入力してください',
                    },
                  })}
                  type='number'
                  label="Fish size"
                  className='w-full mt-2'
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='border-t border-b bg-gray-100 font-semibold w-1/4'>
                <label className='text-lg w-28'>潮汐情報</label>
                {errors.tide && <span className='text-red-500 ml-2'>{errors.tide.message}</span>}
              </TableCell>
              <TableCell className='border-t border-b border-gray-300 w-3/4'>
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
                  <Radio value='大潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2 ml-1'>大潮</Radio>
                  <Radio value='中潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2 ml-1'>中潮</Radio>
                  <Radio value='小潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2 ml-1'>小潮</Radio>
                  <Radio value='長潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2 ml-1'>長潮</Radio>
                  <Radio value='若潮' {...register('tide', { required: '潮汐情報は必須です' })} className='mb-2 ml-1'>若潮</Radio>
                </RadioGroup>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className='text-center'>
          <Link href={`/place/${id}`} passHref>
            <Button color='default' variant='shadow' size='sm' className='mr-20 mt-15 mb-20'>
              <MdCancel />
              キャンセル
            </Button>
          </Link>
          <Button color='primary' variant='shadow' size='sm' className='mr-20 mt-15 mb-20' onClick={handleSubmit(onSubmit)}>
            <IoIosSend />
            登録
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FishLogForm
