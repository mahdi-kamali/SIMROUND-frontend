import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination';

import { deleteF, post, put, useFetch } from '../../../libs/fetcher'
import { ADMIN_PANEL } from '../../../constants/API_URLS'
import { formatDate } from '../../../libs/timeFormater'
import Swal from "sweetalert2"
import { showError, showSuccess } from "../../../libs/alertHandler"


import Table from "../../../components/table/Table"
import ItemHeader from "../../../components/table/components/ItemHeader"
import Property from "../../../components/table/components/Property"
import Row from "../../../components/table/components/Row"
import TableBody from "../../../components/table/components/TableBody"
import TableHeader from "../../../components/table/components/TableHeader"
import TablePaginations from "../../../components/table/components/TablePaginations"
import { Icon } from '@iconify/react';


import Switch from "react-switch";


export default function AllSimCards() {

  const [data, error, loading, refresh, setUrl] = useFetch(
    ADMIN_PANEL.SIM_CARDS.GET + `?pageNumber=${1}`, {})

  const [isAddingSimCard, setIsAddingSimCard] = useState(false)

  const [isTableEditing, setIsTableEditing] = useState(false)


  const headersList = [
    "شناسه",
    "ارقام",
    "هزینه",
    "کارکرد سیمکارت",
    "نام اپراتور",
    "اقصادی",
    "پیش",
    "وضعیت",
    "فروشنده",
    "تاریخ ایجاد",
    "کنترل ها",
    "شمارنده"
  ]







  const handleDeleteSimCardClick = async (simCard) => {
    await Swal.fire({
      icon: "question",
      text: "آیا میخواهید فعالیت را ادامه دهید ؟",
      showDenyButton: true,
      denyButtonText: "حذف",
      confirmButtonText: "لغو",
      confirmButtonColor: "green"
    }).then(res => {
      if (res.isDenied) {
        deleteF(ADMIN_PANEL.SIM_CARDS.DELETE, {
          simCardID: simCard._id
        }).then(resp => {
          showSuccess("موفق!", "سیمکارت مورد نظر حذف شد")
        })
          .catch(err => {
            showError("خطا!", "مشکلی در حین انجام عملیات بوجود آمده است.")
          })
      }
    })

    refresh()
  }


  const handleToggleEditMode = (record) => {
    setIsTableEditing(record)
  }



  const handleEditSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    put(ADMIN_PANEL.SIM_CARDS.PUT, formData)
      .then(res => {
        refresh()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    post(ADMIN_PANEL.SIM_CARDS.POST, formData)
      .then(resp => {
        console.log(resp)
        refresh()
      })
      .catch(err => {
        showError("خطا!", err)
      })

  }



  const simCardUsageOptions = [
    { value: 'new', label: 'جدید' },
    { value: 'used', label: 'مصرف شده' },
    { value: 'semi used', label: 'نسبتا جدید' }
  ]


  const simCardsOperatorName = [
    { value: 'Irancell', label: 'ایرانسل' },
    { value: 'Hamrah-e Aval', label: 'همراه اول' },
    { value: 'Rightel', label: 'رایتل' }
  ]







  return (
    <section className='all-simcards-section'>

      <h1>
        تمامیه سیم کارت های موجود
        <button onClick={() => {
          setIsAddingSimCard(!isAddingSimCard)
        }}>
          <Icon icon="mdi:add-bold" />
          <span>
            اضافه کردن
          </span>
        </button>
      </h1>

      <div className="body">


        <Table

          columnsStyle={
            "6rem 15ch 20ch 9rem 9rem 4rem 7rem 4rem 6rem 6rem 8rem  1fr "}>


          <TableHeader>
            {
              headersList.map((record, index) => {
                return <ItemHeader key={index}>
                  {record}

                </ItemHeader>
              })
            }
          </TableHeader>



          <TableBody>

            {isAddingSimCard && <Row
              onSubmit={handleCreateSubmit}
              key={2500}>

              <Property>
                <div className="property-header">
                  {headersList[0]}
                </div>
                <div className="property-body">
                  خودکار
                </div>
              </Property>

              <Property  >
                <div className="property-header">
                  {headersList[1]}
                </div>
                <div className="property-body price">
                  <input
                    minLength={5}
                    maxLength={5}
                    required
                    type="number"
                    name='numbers'
                  />
                </div>
              </Property>

              <Property>
                <div className="property-header">
                  {headersList[2]}
                </div>
                <div className="property-body price">
                  <input
                    required
                    type="number"
                    name='price'
                  />
                  <small>تومان</small>
                </div>
              </Property>


              <Property >
                <div className="property-header">
                  {headersList[3]}
                </div>
                <div className="property-body select-box">
                  <select
                    name="simCardUsageState" >
                    {simCardUsageOptions.map((item) => {
                      return <option
                        key={item.value}
                        value={item.value}>
                        {item.label}
                      </option>
                    })}
                  </select>

                </div>
              </Property>

              <Property >
                <div className="property-header">
                  {headersList[4]}
                </div>
                <div className="property-body select-box">
                  <select
                    name="operatorName" >
                    {simCardsOperatorName.map((item) => {
                      return <option
                        key={item.value}
                        value={item.value}>
                        {item.label}
                      </option>
                    })}
                  </select>
                </div>
              </Property>

              <Property >
                <div className="property-header">
                  {headersList[5]}
                </div>
                <div className="property-body icon">
                  <input type="checkbox" name='ghesti' />
                </div>
              </Property>

              <Property>
                <div className="property-header">
                  {headersList[6]}
                </div>
                <div className="property-body price">
                  <input
                    required
                    type="number"
                    name='pish'
                    defaultValue={0}
                  />
                </div>
              </Property>

              <Property >
                <div className="property-header">
                  {headersList[7]}
                </div>
                <div className="property-body icon">
                  <input
                    type="checkbox"
                    name='vaziat' />
                </div>
              </Property>

              <Property  >
                <div className="property-header">
                  {headersList[8]}
                </div>
                <div className="property-body">
                  خودکار
                </div>
              </Property>

              <Property >
                <div className="property-header">
                  {headersList[9]}
                </div>
                <div className="property-body">
                  خودکار
                </div>
              </Property>

              <Property >
                <div className="property-header">
                  {headersList[9]}
                </div>
                <div className="property-body">
                  <div className="buttons">
                    <button className='submit'>
                      اضافه کردن
                      <Icon icon="formkit:submit" />
                    </button>
                  </div>
                </div>
              </Property>

              <Property >
                <div className="property-header">
                  {headersList[11]}
                </div>
                <div className="property-body">
                  <h2>
                    -
                  </h2>
                </div>
              </Property>



            </Row>}

            {
              data?.data.map((record, index) => {
                const isRowEditing = record?._id === isTableEditing?._id
                return <Row
                  key={record._id}
                  onSubmit={handleEditSubmit}  >

                  <Property >
                    <div className="property-header">
                      {headersList[0]}
                    </div>
                    <div className="property-body">
                      {record._id}
                      <input
                        type="hidden"
                        name='simCardID'
                        defaultValue={record._id} />
                    </div>

                  </Property>

                  <Property  >
                    <div className="property-header">
                      {headersList[1]}
                    </div>
                    <div className="property-body price">
                      <input
                        readOnly={!isRowEditing}
                        type="number"
                        name='numbers'
                        defaultValue={record.numbers} />
                    </div>
                  </Property>

                  <Property>
                    <div className="property-header">
                      {headersList[2]}
                    </div>
                    <div className="property-body price">
                      <input
                        readOnly={!isRowEditing}

                        type="number"
                        name='price'
                        defaultValue={record.price} />
                      <small>تومان</small>
                    </div>
                  </Property>


                  <Property >
                    <div className="property-header">
                      {headersList[3]}
                    </div>
                    <div className="property-body select-box">
                      <select
                        readOnly={!isRowEditing}
                        defaultValue={record?.simCardUsageState}
                        name="simCardUsageState" >
                        {simCardUsageOptions.map((item) => {
                          return <option
                            key={item.value}
                            value={item.value}>
                            {item.label}
                          </option>
                        })}
                      </select>

                    </div>
                  </Property>

                  <Property >
                    <div className="property-header">
                      {headersList[4]}
                    </div>
                    <div className="property-body select-box">
                      <select
                        readOnly={!isRowEditing}
                        defaultValue={record?.operatorName}
                        name="operatorName" >
                        {simCardsOperatorName.map((item) => {
                          return <option
                            key={item.value}
                            value={item.value}>
                            {item.label}
                          </option>
                        })}
                      </select>
                    </div>
                  </Property>

                  <Property >
                    <div className="property-header">
                      {headersList[5]}
                    </div>
                    <div className="property-body icon">
                      <Switch
                        onChange={(e) => {
                          put(ADMIN_PANEL.SIM_CARDS.PUT, {
                            simCardID: record._id,
                            ghesti: e
                          })
                            .then(res => {
                              refresh()
                            })
                        }}
                        checked={record.ghesti}
                      />
                    </div>
                  </Property>

                  <Property>
                    <div className="property-header">
                      {headersList[6]}
                    </div>
                    <div className="property-body price">
                      <input
                        readOnly={!isRowEditing}

                        type="number"
                        name='pish'
                        defaultValue={record.pish} />
                    </div>
                  </Property>

                  <Property >
                    <div className="property-header">
                      {headersList[7]}
                    </div>
                    <div className="property-body icon">
                      <Switch
                        onChange={(e) => {
                          put(ADMIN_PANEL.SIM_CARDS.PUT, {
                            simCardID: record._id,
                            vaziat: e
                          })
                            .then(res => {
                              refresh()
                            })
                        }}
                        checked={record.vaziat} />
                    </div>
                  </Property>

                  <Property  >
                    <div className="property-header">
                      {headersList[8]}
                    </div>
                    <div className="property-body">
                      {record.sellerID}
                    </div>
                  </Property>

                  <Property >
                    <div className="property-header">
                      {headersList[9]}
                    </div>
                    <div className="property-body">
                      {formatDate(record.createdAt)}
                    </div>
                  </Property>

                  <Property >
                    <div className="property-header">
                      {headersList[10]}
                    </div>
                    <div className="property-body">
                      <div className="buttons">

                        {
                          isRowEditing ?
                            <button
                              className='submit'
                              onClick={() => handleToggleEditMode()}
                              type='button'>
                              <span>ثبت</span>
                              <Icon icon="iconamoon:edit-bold" />
                            </button> :
                            <button
                              className='edit'
                              onClick={() => handleToggleEditMode(record)}
                              type='submit'>
                              <span>ویرایش</span>
                              <Icon icon="iconamoon:edit-bold" />
                            </button>
                        }


                        <button
                          type='button'
                          onClick={() => handleDeleteSimCardClick(record)}
                          className='delete'>
                          حذف
                          <Icon icon="iconamoon:edit-bold" />
                        </button>


                        <button
                          type='button'
                          className={`status status-${record.isActivated}`}
                          onClick={() => {
                            put(ADMIN_PANEL.SIM_CARDS.PUT, {
                              simCardID: record._id,
                              isActivated: !record.isActivated
                            }).then(res => refresh())
                          }}>

                          {
                            record.isActivated ?
                              <>
                                نمایش
                                <Icon icon="eos-icons:system-ok" />
                              </>
                              :
                              <>
                                پنهان
                                <Icon icon="material-symbols:do-not-touch" />
                              </>

                          }
                        </button>
                      </div>

                    </div>
                  </Property>


                  <Property >
                    <div className="property-header">
                      {headersList[11]}
                    </div>
                    <div className="property-body">
                      <h2>
                        {index}
                      </h2>
                    </div>
                  </Property>

                </Row>
              })
            }

          </TableBody>

          <TablePaginations>
            <ResponsivePagination
              current={data?.currentPage ? data?.currentPage : 0}
              total={data?.totalPages}
              onPageChange={(pageNumber) => {
                setUrl(ADMIN_PANEL.SIM_CARDS.GET + `?pageNumber=${pageNumber}`)
              }}
            />
          </TablePaginations>


        </Table>



      </div>

    </section>
  )
}
