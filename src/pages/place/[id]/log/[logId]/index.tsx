import {
  Navbar,
  NavbarBrand,
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableColumn,
  TableCell,
  Modal,
  ModalBody,
  Button,
  ModalFooter,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import { FishLog, FishLogResponse } from '@/Types'
import { TbFish } from "react-icons/tb"
import { GiLuckyFisherman } from "react-icons/gi"
import { DELETE_Fishlog } from '@/graphql/deleteFishlog'
import { MdCancel } from "react-icons/md"
import { FaRegTrashAlt } from "react-icons/fa"

const FishlogDetail = () => {
  const router = useRouter();
  const { logId } = router.query;

  const { data, loading, error } = useQuery<FishLogResponse>(GET_FISHLOG, {
    variables: { getFishLogId: Number(logId) },
  });

  const [deleteFishlog] = useMutation(DELETE_Fishlog);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = () => {
    deleteFishlog({
      variables: {
        delete: {
          id: fishLog.id,
        },
      },
      onCompleted: () => {
        router.push({
          pathname: `/place/${logId}`,
        })
      }
    });
    onClose();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <>なし</>

  const fishLog: FishLog = data.getFishLog;

  return (
    <div className='bg-gray-100 min-h-screen'>
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
      <div className='flex items-center justify-center'>
        <h1 className='text-center text-4xl font-bold mb-3'>
          Fishing record
        </h1>
        <GiLuckyFisherman className='ml-2' size={32} />
      </div>
      <h2 className='text-center text-xl mb-10'>
        {fishLog.placeName} 釣行詳細記録
      </h2>
      <div className='max-w-lg mx-auto shadow-lg p-6 mb-10 bg-white'>
        <h2 className='text-center text-3xl font-semibold mb-8'>
          {fishLog.fishName}
        </h2>
        <div className='container'>
          <Table className='mb-10' hideHeader removeWrapper aria-label='Example static collection table'>
            <TableHeader>
              <TableColumn className='border-r'>項目</TableColumn>
              <TableColumn>情報</TableColumn>
            </TableHeader>
            <TableBody className='bg-gray-100'>
              <TableRow key={`date-${fishLog.id}`}>
                <TableCell className='border-t-5 border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg w-28'>日にち</label>
                </TableCell>
                <TableCell className='text-lg border border-t-5 border-b border-gray-300 w-3/4'>
                  {fishLog.date}
                </TableCell>
              </TableRow>
              <TableRow key={`weather-${fishLog.id}`}>
                <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg w-28'>天気</label>
                </TableCell>
                <TableCell className='text-lg border border-t border-b border-gray-300 w-3/4'>
                  {((fishLog.isSunny && '晴れ') || '') +
                    ((fishLog.isRainy && (fishLog.isSunny ? '・' : '') + '雨') || '') +
                    ((fishLog.isCloudy && (fishLog.isSunny || fishLog.isRainy ? '・' : '') + '曇り') || '')}
                </TableCell>
              </TableRow>
              <TableRow key={`size-${fishLog.id}`}>
                <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg w-28'>サイズ</label>
                </TableCell>
                <TableCell className='text-lg border border-t border-b border-gray-300 w-3/4'>
                  {fishLog.size}cm</TableCell>
              </TableRow>
              <TableRow key={`tide-${fishLog.id}`}>
                <TableCell className='border-t border-gray-300 border-b bg-gray-100 font-semibold w-1/4'>
                  <label className='text-lg w-28'>潮汐情報</label>
                </TableCell>
                <TableCell className='text-lg border border-gray-300 w-3/5'>{fishLog.tide}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <Button onClick={onOpen}>
              <FaRegTrashAlt />
              削除</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <ModalHeader>本当に削除しますか？</ModalHeader>
                <ModalBody>
                  <p>削除すると元に戻すことはできません。</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose} onClick={handleDelete}>
                    <FaRegTrashAlt />
                    削除</Button>
                  <Button onClick={onClose}>
                    <MdCancel />
                    キャンセル</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}




export default FishlogDetail
