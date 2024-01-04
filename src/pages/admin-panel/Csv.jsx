import { Children, useState } from "react"
import { ADMIN_PANEL } from "../../constants/API_URLS"
import { post, put } from "../../libs/fetcher"
import xlsxParser from 'xlsx-parse-json';


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
import { Icon } from "@iconify/react";
import {logFormData} from "../../libs/formDataLogger"


export default function Csv() {


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
      "inputType": "number"
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
      "label": "نوع خواندن",
      "inputName": "readingType",
      "inputType": "text"
    },
    {
      "type": "editable",
      "label": "اپراتور",
      "inputName": "operatorName",
      "inputType": "select",
      "options": [
        { value: 'Irancell', label: 'ایرانسل' },
        { value: 'Hamrah-e Aval', label: 'همراه اول' },
        { value: 'Rightel', label: 'رایتل' }
      ]
    },
    {
      "type": "editable",
      "label": "وضعیت",
      "inputName": "vaziat",
      "inputType": "select",
      "options": [
        { value: 'new', label: 'جدید' },
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

      }
    },
    {
      "type": "editable",
      "label": "قسطی",
      "inputName": "ghesti",
      "inputType": "boolean",
      onChange: (event, id) => {

      }
    },
    {
      "type": "editable",
      "label": "ویژه",
      "inputName": "isVIP",
      "inputType": "boolean",
      onChange: (event, id) => {

      }
    },
    {
      "type": "readOnly",
      "label": "تاریخ ایجاد",
      "inputName": "createdAt",
      "inputType": "date"
    }
  ]


  const [importFile, setImportFile] = useState([])

  const [isRowEditing, setIsRowEditing] = useState(true)



  const onSelectFileInputChange = async (e) => {

    const file = e.target.files[0]

    if (file) {
      const data = await xlsxParser
        .onFileSelection(file)
        .then(data => {
          const result = data.Sheet1

          const temp = result.map(item => {

            const vaziatHeader = headersList.find(item => {
              return item.inputName === "vaziat"
            })
            const operatorNameHeader = headersList.find(item => {
              return item.inputName === "operatorName"
            })





            return {
              _id: "خودکار",
              ghesti: item.aghsat === 1 || item.aghsat === "1",
              numbers: item.shomare,
              price: item.gheymat,
              maxGhestCount: item.max_ghest,
              pish: item.pish,
              label: item.label ? item.label : "تعریف نشده",
              vaziat: vaziatHeader.options[item.vaziat].value,
              operatorName: operatorNameHeader.options[item.operator - 1]?.value,
              khanaei: item.khanaei
            }
          })



          return temp
        });


      setImportFile(data)
    } else {
      setImportFile([])
    }

  }



  const handleRowSubmit = (e) => {
    e.preventDefault()
    alert("ok")
  }


  const handleUploadFileSubmitClick = (e) => {
    e.preventDefault()
    logFormData(e.target)
  }







  return (
    <main className="admin-panel-csv">


      <div className="controll-box">
        <div className="box">
          <span>دریافت اطلاعات</span>
          <button className="download">
            دانلود
            <Icon icon="material-symbols:download" />
          </button>
        </div>

        <form className="box" onSubmit={handleUploadFileSubmitClick}>
          <span>آپلود اطلاعات</span>
          <div className="upload">
            اپلود
            <input
              type="file"
              name="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onSelectFileInputChange}
            />
            <Icon icon="material-symbols:upload" />
          </div>
          {importFile.length !== 0 && <button
            className="submit">
            <Icon icon="el:ok" />
            <span>
              ثبت
            </span>
          </button>}
        </form>
      </div>


      <div className="body">


        <Table

          columnsStyle={
            `6rem 15ch 20ch  10rem 
     15rem 15rem 10rem 10rem 10rem
     10rem 10rem 10rem 10rem 10rem 
     8rem 10rem  10rem  10rem`}>





          <TableHeader>
            {headersList.map((item, index) => {
              return <ItemHeader key={index}>
                {item.label}
              </ItemHeader>
            })}
          </TableHeader>




          <TableBody>


            {
              importFile.map((record, rowIndex) => {

                return <Row
                  onSubmit={handleRowSubmit}
                  // forceSubmit={}
                  key={rowIndex}  >
                  {
                    headersList.map((item, index) => {
                      if (item.inputType === "text") {
                        return <PropertyText
                          key={index}
                          defaultValue={record[item.inputName] ? record[item.inputName] : ""}
                          headerTitle={item.label}
                          inputName={item.inputName}
                          inputType={item.inputType}
                          isRowEditing={item.type == "readOnly" ? false : isRowEditing}
                        />
                      }

                      if (item.inputType === "number") {
                        return <PropertyNumber
                          key={index}
                          defaultValue={record[item.inputName] ? record[item.inputName] : ""}
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
                          isCheckBox={true}
                          key={index}
                          defaultValue={record[item.inputName] | false}
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


                    })
                  }
                </Row>
              })
            }

          </TableBody>



        </Table>



      </div>


    </main>
  )
}
