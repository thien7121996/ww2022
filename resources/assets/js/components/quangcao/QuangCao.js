import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import 'devextreme/dist/css/dx.light.css';

import CustomStore from 'devextreme/data/custom_store';

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Editing,
  Popup,
  Form,
  Item,
  Lookup,
  Selection, Summary, GroupItem, SortByGroupSummaryInfo
} from 'devextreme-react/ui/data-grid';
const pageSizes = [10, 25, 50, 100];
const customDataSource = new CustomStore({
  key: ['id'],
  loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
  load: () => {
      return $.getJSON('http://103.75.185.175/index.php/api/getquangcao');
  },
  insert: function (values) {
    console.log(values)
    axios.post('/index.php/api/themquangcao', values)
    .then(response => {
    
    })
  },
  update: function (key, values) {
    console.log(key)
    axios.post('/index.php/api/capnhatquangcao/'+key.id, values)
    .then(response => {
    
    })
  },
  remove: function(key) {
    return $.ajax({
        url: "http://103.75.185.175/index.php/api/xoaquangcao" + "/" + key.id,
        method: "GET",
    });
}
});
class QuangCao extends React.Component {
  constructor () {
    super()

    this.state = {
      sanphamquangcao: [],
      loaiquangcao: [],
        collapsed: false

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.onContentReady = this.onContentReady.bind(this);
   

  }
  componentWillMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })
    axios.get('/index.php/api/getsanphamquangcao').then(response => {
        this.setState({
          sanphamquangcao: response.data
        })
      })
      axios.get('/index.php/api/getloaiquangcao').then(response => {
        this.setState({
          loaiquangcao: response.data
        })
      })
  }
  componentDidMount() {
   
  }


  handleFieldChange (event) {
   

   var checkedArr = [];
   var value;
    if(event.target.type == 'checkbox')
    {
      
        const checkeds = document.getElementsByTagName('input');
        for (var i = 0; i < checkeds.length; i++) {
          if (checkeds[i].checked) {
            checkedArr.push(checkeds[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
    }
    else if(event.target.type == 'file')
    {
    
      this.setState({
        [event.target.name]:event.target.files[0]
      })
    }
    else
    {
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }
  

render () {
  const { danhsachquangcao } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách quảng cáo
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
      <React.Fragment>
      <DataGrid
        dataSource={customDataSource}
        allowColumnReordering={true}
        showBorders={true}
     
        keyExpr="id"
        onContentReady={this.onContentReady}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
        
        <Editing
           mode="popup"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true} >

              </Editing>
        <Column caption="Ngày chạy"        dataType="date" dataField="ngaychay"  format="d-M-y" groupIndex={0} />
        <Column
          dataField="tenloaiquangcao"
          caption="Tên loại quảng cáo"
          alignment="center"
          allowEditing={false}
          formItem={{visible: false}}
          width={150}
        />
        <Column
          dataField="tensanphamquangcao"
          caption="Sản phẩm quảng cáo"
          alignment="center"
          allowEditing={false}
          formItem={{visible: false}}
        />
         <Column dataField="sanphamquangcao" caption="Tên sản phẩm" width={140} visible={false}>
            <Lookup dataSource={this.state.sanphamquangcao} valueExpr="id" displayExpr="tensanpham" />
          </Column>
          <Column dataField="loaiquangcao" caption="Loại quảng cáo" width={125} visible={false}>
            <Lookup dataSource={this.state.loaiquangcao} valueExpr="id" displayExpr="loaiquangcao" />
          </Column>
        <Column
          dataField="sotienchay"
          caption="Chi phí"
          dataType="number"
          format="#,##0.##"
          alignment="center"
          width={150}
        />
        <Column dataField="hienthi" format="#,##0.##" caption="Hiển thị"  alignment="center"  dataType="number" />
        <Column dataField="click" format="#,##0.##"  caption="Lượt click"  alignment="center"  dataType="number" />
        <Column dataField="soctr"  allowEditing={false}
          formItem={{visible: false}}  format="#,##0.##" caption="CTR"  alignment="center" dataType="number" />
        <Column dataField="socpm"  width={150} allowEditing={false}
          formItem={{visible: false}}  format="#,##0.##" caption="CPM"  alignment="center" dataType="number" />
        <Column dataField="sotuongtac"  allowEditing={false}
          formItem={{visible: false}} format="#,##0.##"   caption="Tương tác" alignment="center" dataType="number"  />
        <Column dataField="comment"  format="#,##0.##"  caption="Comment" alignment="center" dataType="number" />
        <Column dataField="tinnhan" format="#,##0.##"  caption="Tin nhắn"  alignment="center" dataType="number"  />
        <Column dataField="sodienthoai" format="#,##0.##"  caption="Gọi điện"  alignment="center" dataType="number"  />
        <Column dataField="chat"  format="#,##0.##" caption="Chat"  alignment="center" dataType="number"  />
     
        
        <Summary>
        <GroupItem
              column="tensanphamquangcao"
              summaryType="count"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
            <GroupItem
              column="sotienchay"
              summaryType="sum"
              displayFormat="{0}"
              valueFormat="#,##0.##"
              showInGroupFooter={false}
              alignByColumn={true} />
            <GroupItem
              column="hienthi"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
            <GroupItem
              column="click"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
                  <GroupItem
              column="soctr"
              summaryType="avg"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true}
              />
                  <GroupItem
              column="socpm"
              summaryType="avg"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true}
               />
                  <GroupItem
              column="sotuongtac"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
            <GroupItem
              column="comment"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
               <GroupItem
              column="tinnhan"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
               <GroupItem
              column="sodienthoai"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
               <GroupItem
              column="chat"
              summaryType="sum"
              valueFormat="#,##0.##"
              displayFormat="{0}"
              showInGroupFooter={false}
              alignByColumn={true} />
          </Summary>
          <SortByGroupSummaryInfo summaryItem="count" />
       
      </DataGrid>
      </React.Fragment>
      </div>
    
  </div>
</div>
      </div>
    </div>

 
  </div>
  )
}
}

export default QuangCao