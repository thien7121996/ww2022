import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from "react-select"
class TaiKhoan extends Component {
  constructor () {
    super()

    this.state = {
        taikhoan: [],
        danhsachrole: [],
        danhsachchinhanh: [],
        chinhanh: 0,
        name:'',
        email:'',
        password:'',
	    nguonselect: { label: "Không có nguồn", value: 0 },
		saleselect: { label: "Tất cả sale", value: 0 },
		chinhanhselect: { label: "Tất cả chi nhánh", value: 0 },
        role:'',
        idkh: 0,
        updateid:'',
        nguonlist: [],
		listsale: [],
        nguon: 0,
		danhsachsale: 0,
		leadersale: 0
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewTaiKhoan  = this.handleCreateNewTaiKhoan.bind(this)
    this.handleDeleteTaiKhoan  = this.handleDeleteTaiKhoan.bind(this)
    this.handleChiTietTaiKhoan  = this.handleChiTietTaiKhoan.bind(this)
    this.handleUpdateTaiKhoan = this.handleUpdateTaiKhoan.bind(this)
	this.handleFieldChangeNguon = this.handleFieldChangeNguon.bind(this)
	this.handleFieldChangeChiNhanh = this.handleFieldChangeChiNhanh.bind(this)
	this.handleFieldChangeSale = this.handleFieldChangeSale.bind(this)
	this.handleFieldChangeLeaderSale = this.handleFieldChangeLeaderSale.bind(this)
	this.handleFieldChangeLeaderSaleUpdate= this.handleFieldChangeLeaderSaleUpdate.bind(this)
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
    axios.get('/index.php/api/danhsachtaikhoan').then(response => {
        this.setState({
          taikhoan: response.data
        })
      })
	  axios.get('/index.php/api/danhsachtaikhoanrolesale').then(response => {
		   var salejson = []
        salejson.push({ 
            "value" : 0,
            "label"  : "Tất cả sale",
        });
        response.data.forEach(cd => {
         
      
          salejson.push({ 
              "value" : cd.id,
              "label"  : cd.name,
          });
        })
      
    
        this.setState({
          listsale: salejson
        })
      })
      axios.get('/index.php/api/nguongioithieu').then(response => {
		  var nguonjson = []
        nguonjson.push({ 
            "value" : 0,
            "label"  : "Không có nguồn",
        });
        response.data.forEach(cd => {
         
      
          nguonjson.push({ 
              "value" : cd.id,
              "label"  : cd.nguon,
          });
        })
      
        this.setState({
            nguonlist: nguonjson
          })
       
      })
      axios.get('/index.php/api/danhsachrole').then(response => {
        this.setState({
          danhsachrole: response.data
        })
      })
      axios.get('/index.php/api/getchinhanh').then(response => {
		  var chinhanhjson = []
        chinhanhjson.push({ 
            "value" : 0,
            "label"  : "Tất cả chi nhánh",
        });
		response.data.forEach(cd => {
         
      
          chinhanhjson.push({ 
              "value" : cd.id,
              "label"  : cd.tenchinhanh,
          });
        })
        this.setState({
          danhsachchinhanh: chinhanhjson
        })
      })
  }
  componentDidMount() {
   
  }
	
  handleFieldChangeNguon (value) {
   

 
  this.setState({ 
    nguonselect: value,
    nguon: value
  })

 
      
      
      
     }
	 handleFieldChangeChiNhanh (value) {
   

 
  this.setState({ 
    chinhanhselect: value,
    chinhanh: value
  })

 
      
      
      
     }
	 handleFieldChangeSale (value) {
   

 
  this.setState({ 
    saleselect: value,
    danhsachsale: value
  })

 
      
      
      
     }
	 handleFieldChangeLeaderSale(event)
	 {
		 var leadersale = document.getElementById('leadersale');
    
		if(leadersale.checked)
		{
			this.setState({ leadersale: 1 });
			var divleadersale = document.getElementById("quanlysale");
				divleadersale.classList.remove("hidden");
		}
		else
		{
			this.setState({ leadersale: 0 });
			
			var divleadersale = document.getElementById("quanlysale");
				divleadersale.classList.add("hidden");
		}
		 
	 }
	 handleFieldChangeLeaderSaleUpdate(event)
	 {
		 var leadersaleupdate = document.getElementById('updateleadersale');
		 if(leadersaleupdate.checked)
		{
			this.setState({ leadersale: 1 });
			var divleadersale = document.getElementById("quanlysaleupdate");
				divleadersale.classList.remove("hidden");
		}
		else
		{
			this.setState({ leadersale: 0 });
			
			var divleadersale = document.getElementById("quanlysaleupdate");
				divleadersale.classList.add("hidden");
		}
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
		
		if(event.target.id == 'role')
		{
			if(event.target.value== "4" || event.target.value=="5")
			{
				var divleadersale = document.getElementById("quanlyleader");
				divleadersale.classList.remove("hidden");
			}
			else
			{
				var divleadersale = document.getElementById("quanlyleader");
				var divquanlysale = document.getElementById("quanlysale");
				divleadersale.classList.add("hidden");
				divquanlysale.classList.add("hidden");
			}
		}
		if(event.target.id == 'updaterole')
		{
			if(event.target.value== "4" || event.target.value=="5")
			{
				var divleadersale = document.getElementById("quanlyleaderupdate");
				divleadersale.classList.remove("hidden");
			}
			else
			{
				var divleadersale = document.getElementById("quanlyleaderupdate");
				var divquanlysale = document.getElementById("quanlysaleupdate");
				divleadersale.classList.add("hidden");
				divquanlysale.classList.add("hidden");
			}
		}
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  
  handleCreateNewTaiKhoan (event) {
    event.preventDefault()

    const { history } = this.props

    const taikhoan = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      nguon: this.state.nguon,
      chinhanh: this.state.chinhanh,
	  leadersale: this.state.leadersale,
	  danhsachsale: this.state.danhsachsale
    }
    console.log(taikhoan);
    axios.post('/index.php/api/taotaikhoan', taikhoan)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachtaikhoan').then(response => {
            this.setState({
                taikhoan: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementsByClassName("form-control").value = ""
        
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteTaiKhoan(event)
  {
      event.preventDefault()
      let idtaikhoan=event.target.attributes.getNamedItem('data-idtaikhoan').value

      axios.get('/index.php/api/taikhoandelete/'+idtaikhoan)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachtaikhoan').then(response => {
            this.setState({
                taikhoan: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietTaiKhoan(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idtaikhoan').value
    axios.get('/index.php/api/chitiettaikhoan/'+idpc).then(response => {
 
      document.getElementById("updatename").value = response.data["name"]
      document.getElementById("updateemail").value = response.data["email"]
      document.getElementById("updaterole").value = response.data["role"]
     
      var selectdv=document.getElementById("updaterole").childNodes;
      for(var i = 0; i < selectdv.length; i++) {
        var datadv=selectdv[i].value;
        if(datadv==response.data["role"])
        {
          selectdv[i].setAttribute('selected', true);
        }
       }
      
      document.getElementById("updateid").value = response.data["id"]
     document.getElementById('updatenguon').value=response.data["nguon"]
    
	 if(response.data["leadersale"]==1)
	 {
		 document.getElementById("updateleadersale").checked = true;
		 var divleadersale = document.getElementById("quanlyleaderupdate");
				var divquanlysale = document.getElementById("quanlysaleupdate");
				divleadersale.classList.remove("hidden");
				divquanlysale.classList.remove("hidden");
	 }
	 else
	 {
		 document.getElementById("updateleadersale").checked = false; 
		 	 var divleadersale = document.getElementById("quanlyleaderupdate");
				var divquanlysale = document.getElementById("quanlysaleupdate");
				divleadersale.classList.add("hidden");
				divquanlysale.classList.add("hidden");
	 }
	  if(response.data["role"]==4 || response.data["role"]==5)
	  {
		   var divleadersale = document.getElementById("quanlyleaderupdate");
		   divleadersale.classList.remove("hidden");
	  }
       this.setState({
         nguonselect: { label: "Không có nguồn", value: 0 }
       })
     if(response.data["nguon"]!=null)
     {
      var selectdvn=document.getElementById("updatenguon").childNodes;
      this.setState({
         nguonselect: JSON.parse(response.data.nguon)
       })
     }
      document.getElementById('updatechinhanh').value=response.data["chinhanh"]
     
       this.setState({
         chinhanhselect: { label: "Tất cả chi nhánh", value: 0 }
       })
     if(response.data["chinhanh"]!=null || response.data["chinhanh"]!="0")
     {
      var selectdvn=document.getElementById("updatechinhanh").childNodes;
      this.setState({
         chinhanhselect: JSON.parse(response.data.chinhanh)
       })
     }
	 document.getElementById('updatedanhsachsale').value=response.data["danhsachsale"]
     
       this.setState({
         saleselect: { label: "Tất cả sale", value: 0 }
       })
     if(response.data["danhsachsale"]!=null || response.data["danhsachsale"]!="0")
     {
      var selectdvn=document.getElementById("updatedanhsachsale").childNodes;
      this.setState({
         saleselect: JSON.parse(response.data.danhsachsale)
       })
     }
      this.setState({
        name: response.data["name"],
        email: response.data["email"],
        role: response.data["role"],
        updateid: response.data["id"],
        nguon: JSON.parse(response.data["nguon"]),
        chinhanh: JSON.parse(response.data["chinhanh"]),
		leadersale: response.data["leadersale"],
		danhsachsale: JSON.parse(response.data["danhsachsale"]),
      })
    })
  }
  handleUpdateTaiKhoan(event)
  {
    event.preventDefault()
     const taikhoanupdate = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        nguon: this.state.nguon,
        chinhanh: this.state.chinhanh,
		leadersale: this.state.leadersale,
		danhsachsale: this.state.danhsachsale
      }
      console.log(taikhoanupdate);
      axios.post('/index.php/api/updatetaikhoan/'+this.state.updateid,taikhoanupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachtaikhoan').then(response => {
            this.setState({
              taikhoan: response.data
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
const { taikhoan,danhsachrole,nguonlist,nguonselect,danhsachchinhanh,chinhanhselect,listsale,saleselect } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách tài khoản
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã tài khoản</th>
              <th>Tài khoản</th>
              <th>Email</th>
             
              <th>Role</th>
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {taikhoan.map((cd,index) => ( 
            <tr id={"taikhoanitem"+cd.id} data-itemcd={cd.id}>
              <td data-icd={cd.id}>{index+1}</td>
              <td data-icd={cd.id}>{cd.id}</td>
              <td data-icd={cd.id}>{cd.name}</td>
             
              <td data-icd={cd.id}>{cd.email}</td>
              
              <td data-icd={cd.id}>{cd.roles["role"]}</td>
              <td className="btnaction"><button onClick={this.handleChiTietTaiKhoan} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idtaikhoan={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idtaikhoan={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo tài khoản</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewTaiKhoan}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên tài khoản</label>
              <input type="text" className="form-control" name="name" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Email</label>
              <input type="text" className="form-control" name="email" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Mật khẩu</label>
              <input type="text" className="form-control" name="password" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Role</label>
              <select className="form-control" name="role" id="role" onChange={this.handleFieldChange}>
                        <option value="">Chọn quyền</option>
                        {danhsachrole.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.role}</option>
                        ))}
                          
                         
                    </select>
            </div>
			<div className="form-group hidden" id="quanlyleader">
			 <input class="form-check-input" type="checkbox" name="leadersale" id="leadersale" value="0"  onChange={this.handleFieldChangeLeaderSale} />
			<label class="form-check-label " for="inlineRadio1">Leader sale</label>
			</div>
			<div className="form-group hidden" id="quanlysale">
              <label htmlFor="recipient-name" className="control-label">Sale quản lý</label>
			   <Select
                        
                        isClearable
                        name="danhsachsale"
                        id="danhsachsale"
                        isMulti
                        onChange={value => this.handleFieldChangeSale(value)}
						defaultValue={saleselect}
                        options={listsale}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
             
              
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Chi nhánh</label>
			   <Select
                        
                        isClearable
                        name="chinhanh"
                        id="chinhanh"
                        isMulti
                        onChange={value => this.handleFieldChangeChiNhanh(value)}
						defaultValue={chinhanhselect}
                        options={danhsachchinhanh}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
             
              
            </div>
            <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Nguồn</label>
                      
					 <Select
                        
                        isClearable
                        name="nguon"
                        id="nguon"
                        isMulti
                        onChange={value => this.handleFieldChangeNguon(value)}
                
                        options={nguonlist}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
                        </div>
                    
                    </div>
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Tài Khoản</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateTaiKhoan}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên tài khoản</label>
              <input type="text" className="form-control" name="name" id="updatename" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Email</label>
              <input type="text" className="form-control" name="email" id="updateemail" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Password</label>
              <input type="text" className="form-control" name="password" id="updatepassword" placeholder="Nếu không thay đổi thì bỏ trống" onChange={this.handleFieldChange} /> 
            </div>
            
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Role</label>
              <select className="form-control" name="role" id="updaterole" onChange={this.handleFieldChange}>
                        <option value="">Chọn quyền</option>
                        {danhsachrole.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.role}</option>
                        ))}
                          
                         
                    </select>
              
            </div>
			<div className="form-group hidden" id="quanlyleaderupdate">
			 <input class="form-check-input" type="checkbox" name="leadersale" id="updateleadersale" value="0"  onChange={this.handleFieldChangeLeaderSaleUpdate} />
			<label class="form-check-label " for="inlineRadio1">Leader sale</label>
			</div>
			<div className="form-group hidden" id="quanlysaleupdate">
              <label htmlFor="recipient-name" className="control-label">Sale quản lý</label>
			   <Select
                        
                        isClearable
                        name="danhsachsale"
                        id="updatedanhsachsale"
                        isMulti
                        onChange={value => this.handleFieldChangeSale(value)}
						defaultValue={saleselect}
                        options={listsale}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
             
              
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Chi nhánh</label>
            
               <Select
                        
                        isClearable
                        name="chinhanh"
                        id="updatechinhanh"
                        isMulti
                        onChange={value => this.handleFieldChangeChiNhanh(value)}
						
                        value={chinhanhselect}
                        options={danhsachchinhanh}
                        className="basic-select"
                  classNamePrefix="select"
                
                      />
            </div>
            <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Nguồn</label>
                      <Select
                        
                        isClearable
                        name="nguon"
                        id="updatenguon"
                        isMulti
                        onChange={value => this.handleFieldChangeNguon(value)}
						
                        value={nguonselect}
                        options={nguonlist}
                        className="basic-select"
                  classNamePrefix="select"
                
                      />
                        </div>
                    
                    </div>
              </div>
            <div className="form-group hidden">
              <label htmlFor="message-text"  className="control-label">ID:</label>
              <input className="form-control" id="updateid" name="updateid" onChange={this.handleFieldChange} />
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

export default TaiKhoan