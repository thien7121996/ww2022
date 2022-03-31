import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LoaiQuangCao extends Component {
  constructor () {
    super()

    this.state = {
        danhsachloaiquangcao: [],
        loaiquangcao: '',
        updateid: ''

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewLoaiQuangCao  = this.handleCreateNewLoaiQuangCao.bind(this)
    this.handleDeleteLoaiQuangCao  = this.handleDeleteLoaiQuangCao.bind(this)
    this.handleChiTietLoaiQuangCao  = this.handleChiTietLoaiQuangCao.bind(this)
    this.handleUpdateLoaiQuangCao = this.handleUpdateLoaiQuangCao.bind(this)
  

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
    axios.get('/index.php/api/getloaiquangcao').then(response => {
        this.setState({
          danhsachloaiquangcao: response.data
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
  
  handleCreateNewLoaiQuangCao (event) {
    event.preventDefault()

    const { history } = this.props

    const loaiquangcao = {
      loaiquangcao: this.state.loaiquangcao,

    }
    console.log(loaiquangcao);
    axios.post('/index.php/api/themloaiquangcao', loaiquangcao)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getloaiquangcao').then(response => {
            this.setState({
              danhsachloaiquangcao: response.data
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
  handleDeleteLoaiQuangCao(event)
  {
      event.preventDefault()
      let idloaiquangcao=event.target.attributes.getNamedItem('data-idloaiquangcao').value

      axios.get('/index.php/api/xoaloaiquangcao/'+idloaiquangcao)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getloaiquangcao').then(response => {
            this.setState({
              danhsachloaiquangcao: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietLoaiQuangCao(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idloaiquangcao').value
    axios.get('/index.php/api/getloaiquangcaotheoid/'+idpc).then(response => {
 
      document.getElementById("updateloaiquangcao").value = response.data[0]["loaiquangcao"]
      document.getElementById("updateid").value = response.data[0]["id"]

      this.setState({
        loaiquangcao: response.data[0]["loaiquangcao"],
        updateid: response.data[0]["id"]
      })
    })
   

 
  
   
  }
  handleUpdateLoaiQuangCao(event)
  {
    event.preventDefault()
     const loaiquangcaoupdate = {
      loaiquangcao: this.state.loaiquangcao,
      }
      console.log(loaiquangcaoupdate);
      axios.post('/index.php/api/capnhatloaiquangcao/'+this.state.updateid,loaiquangcaoupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getloaiquangcao').then(response => {
            this.setState({
              danhsachloaiquangcao: response.data
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
const { danhsachloaiquangcao } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách loại quảng cáo
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên loại quảng cáo</th>
          
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
         
          <tbody>
          {danhsachloaiquangcao.map(dv => ( 
            <tr id={"loaiquangcaoitem"+dv.id} data-itemdv={dv.id}>
            
              <td data-iddv={dv.id}>{dv.loaiquangcao}</td>
              <td className="btnaction"><button data-idloaiquangcao={dv.id} onClick={this.handleDeleteLoaiQuangCao} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dv.id}><i className="fa fa-trash-o" data-idloaiquangcao={dv.id}></i></button><button onClick={this.handleChiTietLoaiQuangCao} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idloaiquangcao={dv.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" onClick={this.handleChiTietLoaiQuangCao} data-idloaiquangcao={dv.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo loại quảng cáo</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLoaiQuangCao}>
            
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Loại quảng cáo</label>
              <input type="text" className="form-control" name="loaiquangcao" id="recipient-name1" onChange={this.handleFieldChange} /> 
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
          <form onSubmit={this.handleUpdateLoaiQuangCao}>
   
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="loaiquangcao" id="updateloaiquangcao" onChange={this.handleFieldChange} /> 
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

export default LoaiQuangCao