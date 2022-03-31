import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapDichVu extends Component {
  constructor () {
    super()

    this.state = {
        dichvusanpham: [],
        ten: '',
        sotien: '0',
        baohanh: 'không có nội dung bảo hành',
        donvitinh: 'không có đơn vị tính',
        idcha: '1',
        updateid: ''

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewDichVu  = this.handleCreateNewDichVu.bind(this)
    this.handleDeleteDichVu  = this.handleDeleteDichVu.bind(this)
    this.handleChiTietDichVu  = this.handleChiTietDichVu.bind(this)
    this.handleUpdateDichVu = this.handleUpdateDichVu.bind(this)
  

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
    axios.get('/index.php/api/dichvusanpham').then(response => {
        this.setState({
          dichvusanpham: response.data
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
  
  handleCreateNewDichVu (event) {
    event.preventDefault()

    const { history } = this.props

    const dichvusanpham = {
      ten: this.state.ten,
      sotien: this.state.sotien,
      baohanh: this.state.baohanh,
      donvitinh: this.state.donvitinh,
      idcha: this.state.idcha

    }
    console.log(dichvusanpham);
    axios.post('/index.php/api/dichvusanpham', dichvusanpham)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dichvusanpham').then(response => {
            this.setState({
              dichvusanpham: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
    document.getElementById("recipient-name2").value = ""
    document.getElementById("recipient-name3").value = ""
    document.getElementById("message-text1").value = ""
    document.getElementById("message-text2").value = ""
      })
      .catch(error => {
        this.setState({
    
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteDichVu(event)
  {
      event.preventDefault()
      let iddichvu=event.target.attributes.getNamedItem('data-iddichvu').value

      axios.get('/index.php/api/dichvusanphamdelete/'+iddichvu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dichvusanpham').then(response => {
            this.setState({
              dichvusanpham: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietDichVu(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-iddichvu').value
    axios.get('/index.php/api/sanphamdichvutheoid/'+idpc).then(response => {
      
      document.getElementById("updateten").value = response.data["ten"]
      document.getElementById("updatesotien").value = response.data["sotien"]
      document.getElementById("updatebaohanh").value = response.data["baohanh"]
      document.getElementById("updatedonvitinh").value = response.data["donvitinh"]
      document.getElementById("updateidcha").value = response.data["id"]
      document.getElementById("updateid").value = idpc
      var selectidcha=response.data["idcha"]
      
      for(var i = 0; i < selectidcha.length; i++) {
       var datagt=selectidcha[i].value;
       if(datagt==response.data["idcha"])
       {
        selectidcha[i].setAttribute('selected', true);
       }
      }
      this.setState({
        ten: response.data["ten"],
        sotien: response.data["sotien"],
        baohanh: response.data["baohanh"],
        donvitinh: response.data["donvitinh"],
        idcha: response.data["idcha"],
        updateid: response.data["id"]
      })
    })
   

 
  
   
  }
  handleUpdateDichVu(event)
  {
    event.preventDefault()
     const dichvuupdate = {
      ten: this.state.ten,
      sotien: this.state.sotien,
      baohanh: this.state.baohanh,
      donvitinh: this.state.donvitinh,
      idcha: this.state.idcha,

      }
      console.log(dichvuupdate);
      axios.post('/index.php/api/dichvusanphamupdate/'+this.state.updateid,dichvuupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dichvusanpham').then(response => {
            this.setState({
              dichvusanpham: response.data
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
const { dichvusanpham } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách điều trị
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Thủ thuật, dịch vụ, sản phẩm, công việc các loại</th>
              <th>Số tiền</th>
              <th>Bảo hành</th>
              <th>Đơn vị tính</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
    
          <tbody>
          {dichvusanpham.map(dv => ( 
            <tr id={"dichvuitem"+dv.id} data-itemdv={dv.id}>
            
              <td data-iddv={dv.id}>{dv.ten}</td>
              <td data-iddv={dv.id}><span class="sotien">{dv.sotien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span> VNĐ</td>
              <td data-iddv={dv.id}>{dv.baohanh}</td>
              <td data-iddv={dv.id}>{dv.donvitinh}</td>
              <td className="btnaction"><button data-iddichvu={dv.id} onClick={this.handleDeleteDichVu} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dv.ID}><i className="fa fa-trash-o" data-iddichvu={dv.id}></i></button><button onClick={this.handleChiTietDichVu} className="icon-list-demo btn btn-info btn-circle btn-xl" data-iddichvu={dv.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-iddichvu={dv.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo dịch vụ/thủ thuật/công việc</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewDichVu}>
            <div className="form-group hidden">
              <label htmlFor="recipient-name" className="control-label">Thuộc nhóm</label>
              <select className="form-control" name="idcha" id="recipient-name1" onChange={this.handleFieldChange}>
              <option value="0" checked>Chọn nhóm</option>
              {dichvusanpham.map(dv => (
                <option value={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="recipient-name2" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn giá (VNĐ)</label>
              <input type="text" className="form-control" name="sotien" id="recipient-name3" onChange={this.handleFieldChange} /> 
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Bảo hành</label>
              <textarea className="form-control" id="message-text1" name="baohanh" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Đơn vị tính</label>
              <textarea className="form-control" id="message-text2" name="donvitinh" onChange={this.handleFieldChange} />
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật điều trị</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateDichVu}>
          <div className="form-group hidden">
              <label htmlFor="recipient-name" className="control-label">Thuộc nhóm</label>
              <select className="form-control" name="idcha" id="updateidcha" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn nhóm</option>
              {dichvusanpham.map(dv => (
                <option value={dv.id} data-gt={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn giá (đ)</label>
              <input type="text" className="form-control" name="sotien" id="updatesotien" onChange={this.handleFieldChange} /> 
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Bảo hành</label>
              <textarea className="form-control" id="updatebaohanh" name="baohanh" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Đơn vị tính</label>
              <textarea className="form-control" id="updatedonvitinh" name="donvitinh" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group hidden">
              <label htmlFor="recipient-name" className="control-label">ID Dich Vụ</label>
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

export default ThietLapDichVu