import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { deleteF, post, put, useFetch } from '../../libs/fetcher'
import { ADMIN_PANEL } from '../../constants/API_URLS'
import Swal from "sweetalert2"
import { showError, showSuccess } from "../../libs/alertHandler"


import Table from "../../components/table/Table"
import ItemHeader from "../../components/table/components/ItemHeader"
import Property from "../../components/table/components/Property"
import Row from "../../components/table/components/Row"
import TableBody from "../../components/table/components/TableBody"
import TableHeader from "../../components/table/components/TableHeader"
import TablePaginations from "../../components/table/components/TablePaginations"
import PropertyText from '../../components/table/components/PropertyText';
import PropertyNumber from '../../components/table/components/PropertyNumber';
import PropertySelect from '../../components/table/components/PropertySelect';
import PropertyDate from '../../components/table/components/PropertyDate';
import PropertyBoolean from '../../components/table/components/PropertyBoolean';
import ResponsivePagination from 'react-responsive-pagination';




import { logFormData } from '../../libs/formDataLogger';


export default function AllSimCards() {

  const [data, error, loading, refresh, setUrl] = useFetch(
    ADMIN_PANEL.SIM_CARDS.GET + `?pageNumber=${1}`, {})

  const [isAddingSimCard, setIsAddingSimCard] = useState(false)

  const [isTableEditing, setIsTableEditing] = useState(false)


  const headersList = [
    {
      "type": "readOnly",
      "label": "شناسه",
      "inputName": "_id",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "شماره تلفن",
      "inputName": "numbers",
      "inputType": "number"
    },
    {
      "type": "editable",
      "label": "خانه ای",
      "inputName": "khanaei",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "قیمت",
      "inputName": "price",
      "inputType": "number"
    },
    {
      "type": "editable",
      "label": "حداکثر تعداد قسط",
      "inputName": "maxGhestCount",
      "inputType": "number"
    },
    {
      "type": "editable",
      "label": "پیش پرداخت",
      "inputName": "pish",
      "inputType": "number"
    },
    {
      "type": "editable",
      "label": "برچسب",
      "inputName": "label",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "توضیحات",
      "inputName": "description",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "نوع خواندن",
      "inputName": "readingType",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "اپراتور",
      "inputName": "operatorName",
      "inputType": "select",
      "options": [{ value: 'Irancell', label: 'ایرانسل' },
      { value: 'Hamrah-e Aval', label: 'همراه اول' },
      { value: 'Rightel', label: 'رایتل' }
      ]
    },
    {
      "type": "editable",
      "label": "فروشنده",
      "inputName": "seller",
      "inputType": "select",
      "options": [
        { value: '1', label: 'احمد' },
        { value: '3', label: 'فلاحی' },
        { value: '4', label: 'غدیر' },
        { value: '5', label: 'پویا نژاد' },
      ]
    },
    {
      "type": "readOnly",
      "label": "شناسه فروشنده",
      "inputName": "sellerID",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "وضعیت",
      "inputName": "vaziat",
      "inputType": "select",
      "options": [
        { value: 'new', label: 'صفر' },
        { value: 'used', label: 'کارکرده' },
        { value: 'semi used', label: 'اعتباری' }
      ]
    },
    {
      "type": "editable",
      "label": "تاریخ فعال‌سازی",
      "inputName": "activationDate",
      "inputType": "date"
    },
    {
      "type": "editable",
      "label": "فعال شده",
      "inputName": "isActivated",
      "inputType": "boolean",
      onChange: (event, id) => {
        put(ADMIN_PANEL.SIM_CARDS.PUT, {
          _id: id,
          isActivated: event
        })
          .then(res => {
            refresh()
          })
      }
    },
    {
      "type": "editable",
      "label": "قسطی",
      "inputName": "ghesti",
      "inputType": "boolean",
      onChange: (event, id) => {
        put(ADMIN_PANEL.SIM_CARDS.PUT, {
          _id: id,
          ghesti: event
        })
          .then(res => {
            refresh()
          })
      }
    },
    {
      "type": "editable",
      "label": "ویژه",
      "inputName": "isVIP",
      "inputType": "boolean",
      onChange: (event, id) => {
        put(ADMIN_PANEL.SIM_CARDS.PUT, {
          _id: id,
          isVIP: event
        })
          .then(res => {
            refresh()
          })
      }
    },
    {
      "type": "readOnly",
      "label": "تاریخ ایجاد",
      "inputName": "createdAt",
      "inputType": "date"
    },
    {
      "type": "readOnly",
      "label": "کنترل ها",
      "inputName": "createdAt",
      "inputType": "controll"
    }
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
    logFormData(e.target)
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

    logFormData(e.target)
    post(ADMIN_PANEL.SIM_CARDS.POST, formData)
      .then(resp => {
        console.log(resp)
        refresh()
      })
      .catch(err => {
        showError("خطا!", err)
      })

  }




  return (
    <main className='admin-panel-all-simcards'>

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
            `6rem 15ch 20ch  10rem 
             15rem 15rem 10rem 10rem 10rem
             10rem 10rem 10rem 10rem 10rem 
             8rem 10rem 10rem  10rem 10rem `}>




          <TableHeader>
            {headersList.map((item, index) => {
              return <ItemHeader key={index}>
                {item.label}
              </ItemHeader>
            })}
          </TableHeader>




          <TableBody>

            {isAddingSimCard && (
              <Row
                onSubmit={handleCreateSubmit}
                key={2500}>

                {headersList.map((item, index) => {
                  if (item.inputType === "text") {
                    return (
                      <PropertyText
                        key={index}
                        defaultValue={item.type === "readOnly" ? "خودکار" : ""}
                        headerTitle={item.label}
                        inputName={item.type === "readOnly" ? undefined : item.inputName}
                        inputType={"text"}
                        isRowEditing={item.type === "readOnly" ? false : true} // Assuming you want the first row in editing mode
                      />
                    );
                  }

                  if (item.inputType === "number") {
                    return (
                      <PropertyNumber
                        key={index}
                        defaultValue={item.type === "readOnly" ? "خودکار" : ""}
                        headerTitle={item.label}
                        inputName={item.inputName}
                        inputType={item.inputType}
                        isRowEditing={item.type === "readOnly" ? false : true}
                      />
                    );
                  }

                  if (item.inputType === "select") {
                    return (
                      <PropertySelect
                        key={index}
                        defaultValue={item.type === "readOnly" ? "خودکار" : ""}
                        headerTitle={item.label}
                        inputName={item.inputName}
                        inputType={item.inputType}
                        isRowEditing={item.type === "readOnly" ? false : true}
                        options={item.options}
                      />
                    );
                  }

                  if (item.inputType === "boolean") {
                    return (
                      <input type="checkbox" name={item.inputName} />
                    );
                  }

                  if (item.inputType === "date") {
                    return (
                      <PropertyDate
                        key={index}
                        defaultValue={item.type === "readOnly" ? "خودکار" : ""}
                        headerTitle={item.label}
                        inputName={item.inputName}
                        inputType={item.inputType}
                        isRowEditing={item.type === "readOnly" ? false : true}
                      />
                    );
                  }

                  if (item.inputType === "controll") {
                    return (
                      <Property key={index}>
                        <div className="property-header">کنترل ها</div>
                        <div className="property-body">
                          <div className="buttons">
                            <button
                              className="submit"
                              type="submit"
                            >
                              <span>اضافه کردن</span>
                              <Icon icon="formkit:submit" />
                            </button>
                          </div>
                        </div>
                      </Property>
                    );
                  }

                  return null;
                })}
              </Row>
            )}


            {
              data?.data.map((record, index) => {
                const isRowEditing = record?._id === isTableEditing?._id
                return <Row
                  key={record._id}
                  onSubmit={handleEditSubmit}  >



                  {
                    headersList.map((item, index) => {


                      if (item.inputType === "text") {
                        return <PropertyText
                          key={index}
                          defaultValue={record[item.inputName]}
                          headerTitle={item.label}
                          inputName={item.inputName}
                          inputType={item.inputType}
                          isRowEditing={item.type == "readOnly" ? false : isRowEditing}
                        />
                      }


                      if (item.inputType === "number") {
                        return <PropertyNumber
                          key={index}
                          defaultValue={record[item.inputName]}
                          headerTitle={item.label}
                          inputName={item.inputName}
                          inputType={item.inputType}
                          isRowEditing={item.type == "readOnly" ? false : isRowEditing}
                        />
                      }

                      if (item.inputType === "select") {
                        return <PropertySelect
                          key={index}
                          defaultValue={record[item.inputName]}
                          headerTitle={item.label}
                          inputName={item.inputName}
                          inputType={item.inputType}
                          isRowEditing={item.type == "readOnly" ? false : isRowEditing}
                          options={item.options}
                        />
                      }


                      if (item.inputType === "boolean") {
                        return <PropertyBoolean
                          key={index}
                          defaultValue={record[item.inputName]}
                          headerTitle={item.label}
                          inputName={item.inputName}
                          inputType={item.inputType}
                          isRowEditing={item.type == "readOnly" ? false : isRowEditing}
                          onChange={(e) => {
                            item.onChange(e, record._id)
                          }}
                        />
                      }


                      if (item.inputType === "date") {
                        return <PropertyDate
                          key={index}
                          defaultValue={record[item.inputName]}
                          headerTitle={item.label}
                          inputName={item.inputName}
                          inputType={item.inputType}
                          isRowEditing={item.type == "readOnly" ? false : isRowEditing}
                        />
                      }



                      if (item.inputType === "controll") {
                        return <Property key={index} >
                          <div className="property-header">
                            کنترل ها
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
                                    _id: record._id,
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
                      }



                    })
                  }




                  {
                  /* 
               

          

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
                  </Property> */}



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

    </main>
  )
}
