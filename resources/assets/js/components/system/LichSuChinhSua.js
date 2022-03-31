import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Column, DataGrid, FilterRow, Selection, HeaderFilter, GroupPanel, Scrolling, Editing, Grouping, Lookup, MasterDetail, Summary, RangeRule, RequiredRule, StringLengthRule, GroupItem, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
class LichSuChinhSua extends Component {
    constructor (props) {
        super(props)

    this.state = {
        lichsuchinhsua: []
        
        

    }
   
  

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
    axios.get('/index.php/api/danhsachlichsuchinhsua/').then(response => {
        this.setState({
            lichsuchinhsua: response.data
        })
      })
      
  }
  componentDidMount() {
   
  }

  
  

render () {
const { lichsuchinhsua} = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
    <section>
<div className="sttabs tabs-style-bar">
<nav>
 
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
      <div className="white-box">
        <h3 className="box-title">LỊCH SỬ CHỈNH SỬA
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
      <DataGrid
        dataSource={lichsuchinhsua}
        showBorders={true}
        keyExpr="id"
         
      >
       
        <FilterRow visible={true} />
      
      
      
   
        <Selection mode="single" />
        
        <Column
          caption="STT"
          cellRender={cellRenderRowIndex}
          width={80}
        />
        <Column
          caption="Thời gian chỉnh sửa"
          dataField="created_at"
          dataType="date"
          format="dd/MM/yyyy HH:mm:ss"
          width={150}
        />
        <Column
         caption="Nội dung"
          dataField="noidungchinhsua"
         
        />
       <Column
        caption="MSKH"
        dataField="khachhang.ID"
       
        />
        <Column
        caption="Họ và tên"
        dataField="khachhang.hoten"
        cellRender={cellRenderRowVietHoa}
        />
        
        <Column
        caption="Chi tiết"
        dataField="khachhang.ID"
        cellRender={cellRenderHoTen}
        />
          <Column
         caption="Người chỉnh sửa"
          dataField="userchinhsua"
         
        />
      </DataGrid>
      
      </div>
    
  </div>
</div>
      </div>
    </div>
   

  </div>
  )
}
}
function cellRenderRowIndex(data) {
  return data.rowIndex+1;
}
function cellRenderRowVietHoa(data) {
  return <p style={{ textTransform: 'capitalize' }}>{data.value}</p>;
}
function cellRenderHoTen(data) {
  
  return (
    <Link to={"ho-so-khach-hang/"+data.value}>Chi tiết</Link>
  )
}


export default LichSuChinhSua