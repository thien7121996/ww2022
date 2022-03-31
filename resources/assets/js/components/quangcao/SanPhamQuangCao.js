import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SanPhamQuangCao extends Component {
  constructor () {
    super()

    this.state = {
        danhsachsanphamquangcao: [],
        tensanpham: '',
        updateid: ''

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewSanPhamQuangCao  = this.handleCreateNewSanPhamQuangCao.bind(this)
    this.handleDeleteSanPhamQuangCao  = this.handleDeleteSanPhamQuangCao.bind(this)
    this.handleChiTietSanPhamQuangCao  = this.handleChiTietSanPhamQuangCao.bind(this)
    this.handleUpdateSanPhamQuangCao = this.handleUpdateSanPhamQuangCao.bind(this)
  

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
          danhsachsanphamquangcao: response.data
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
  
  handleCreateNewSanPhamQuangCao (event) {
    event.preventDefault()

    const { history } = this.props

    const sanphamquangcao = {
      tensanpham: this.state.tensanpham,

    }
    console.log(sanphamquangcao);
    axios.post('/index.php/api/themsanphamquangcao', sanphamquangcao)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getsanphamquangcao').then(response => {
            this.setState({
              danhsachsanphamquangcao: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
      })
      .catch(error => {
        this.setState({
    
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteSanPhamQuangCao(event)
  {
      event.preventDefault()
      let idsanphamquangcao=event.target.attributes.getNamedItem('data-idsanphamquangcao').value

      axios.get('/index.php/api/xoasanphamquangcao/'+idsanphamquangcao)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getsanphamquangcao').then(response => {
            this.setState({
              danhsachsanphamquangcao: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietSanPhamQuangCao(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idsanphamquangcao').value
    axios.get('/index.php/api/getsanphamquangcaotheoid/'+idpc).then(response => {
 
      document.getElementById("updatetensanpham").value = response.data[0]["tensanpham"]
      document.getElementById("updateid").value = response.data[0]["id"]

      this.setState({
        loaiquangcao: response.data[0]["tensanpham"],
        updateid: response.data[0]["id"]
      })
    })
   

 
  
   
  }
  handleUpdateSanPhamQuangCao(event)
  {
    event.preventDefault()
     const sanphamquangcaoupdate = {
      tensanpham: this.state.tensanpham,
      }
      console.log(sanphamquangcaoupdate);
      axios.post('/index.php/api/capnhatsanphamquangcao/'+this.state.updateid,sanphamquangcaoupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getsanphamquangcao').then(response => {
            this.setState({
              danhsachsanphamquangcao: response.data
            })
          })
          var button = document.getElementById('btn-ends')
          button.click()
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-ends')
        button.click()
      })
      
    
  }

render () {
const { danhsachsanphamquangcao } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách sản phẩm quảng cáo
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
          
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
         
          <tbody>
          {danhsachsanphamquangcao.map(dv => ( 
            <tr id={"sanphamquangcaoitem"+dv.id} data-itemdv={dv.id}>
            
              <td data-iddv={dv.id}>{dv.tensanpham}</td>
              <td className="btnaction"><button data-idsanphamquangcao={dv.id} onClick={this.handleDeleteSanPhamQuangCao} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dv.id}><i className="fa fa-trash-o" data-idsanphamquangcao={dv.id}></i></button><button onClick={this.handleChiTietSanPhamQuangCao} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idsanphamquangcao={dv.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" onClick={this.handleChiTietSanPhamQuangCao} data-idsanphamquangcao={dv.id}></i></button></td>
             
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>
    
  </div>
</div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo sản phẩm quảng cáo</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewSanPhamQuangCao}>
            
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên sản phẩm quảng cáo</label>
              <input type="text" className="form-control" name="tensanpham" id="recipient-name1" onChange={this.handleFieldChange} /> 
              </div>
            
     
            <div className="modal-footer">
          <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật loại quảng cáo</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateSanPhamQuangCao}>
   
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="tensanpham" id="updatetensanpham" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group hidden">
              <label htmlFor="recipient-name" className="control-label">id update</label>
              <input type="text" className="form-control" name="updateid" id="updateid" onChange={this.handleFieldChange} /> 
              </div>
           
          
         
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  </div>
  )
}
}

export default SanPhamQuangCao