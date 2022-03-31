import React, { Component } from 'react'


class ChiTieuHangNgay extends Component {
    constructor () {
        super()
    
        this.state = {
            phieuchi: [],
            ngaychi: '',
            khoanchi: '',
            sotien: '',
            idphieu: '',
            daterange:'',
            tongtien:''
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewPhieuChi  = this.handleCreateNewPhieuChi.bind(this)
        this.handleDeletePhieuChi  = this.handleDeletePhieuChi.bind(this)
        this.handleChiTietPhieuChi  = this.handleChiTietPhieuChi.bind(this)
        this.handleUpdatePhieuChi = this.handleUpdatePhieuChi.bind(this)
        this.handleChonNgayPhieuChi = this.handleChonNgayPhieuChi.bind(this)
        this.handleChonReset = this.handleChonReset.bind(this)
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
        axios.get('/index.php/api/phieuchi').then(response => {
            this.setState({
              phieuchi: response.data
            })
          })
          axios.get('/index.php/api/tongsotienchi').then(response => {
            this.setState({
              tongtien: response.data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            })
          })
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
      
      handleCreateNewPhieuChi (event) {
        event.preventDefault()

        const { history } = this.props

        const phieuchi = {
          ngaychi: this.state.ngaychi,
          khoanchi: this.state.khoanchi,
          sotien: this.state.sotien,

        }
        console.log(phieuchi);
        axios.post('/index.php/api/phieuchi', phieuchi)
          .then(response => {
            // redirect to the homepage
            axios.get('/index.php/api/phieuchi').then(response => {
                this.setState({
                  phieuchi: response.data
                })
              })
            var button = document.getElementById('btn-end')
            button.click()
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
            var button = document.getElementById('btn-end')
            button.click()
          })
      }
      handleDeletePhieuChi(event)
      {
          event.preventDefault()
          let idphieuchi=event.target.attributes.getNamedItem('data-idphieuchi').value

          axios.get('/index.php/api/phieuchidelete/'+idphieuchi)
          .then(response => {
            // redirect to the homepage
            axios.get('/index.php/api/phieuchi').then(response => {
                this.setState({
                  phieuchi: response.data
                })
              })
           
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
            
          })
      }
      handleChiTietPhieuChi(event)
      {
        event.preventDefault()
        let idpc=event.target.attributes.getNamedItem('data-idphieuchi').value
        var sottitem = document.getElementById('phieuchiitem'+idpc)
        var khoanchi=sottitem.children[0].innerHTML
        var ngaychi=sottitem.children[1].innerHTML
        var sotien=sottitem.children[2].innerHTML
        
        document.getElementById("updatengaychi").value = ngaychi
        document.getElementById("updatesotien").value = sotien
        document.getElementById("updatekhoanchi").value = khoanchi
        document.getElementById("updateid").value = idpc
        this.setState({
          ngaychi:ngaychi,
          khoanchi:khoanchi,
          sotien:sotien,
          idphieu:idpc,
          
        })
      }
      handleUpdatePhieuChi(event)
      {
        event.preventDefault()
         const phieuchiupdate = {
            ngaychi: this.state.ngaychi,
            khoanchi: this.state.khoanchi,
            sotien: this.state.sotien,
            idphieu: this.state.idphieu
          }
          console.log(phieuchiupdate);
          axios.post('/index.php/api/phieuchiupdate/'+this.state.idphieu,phieuchiupdate)
          .then(response => {
            // redirect to the homepage
            axios.get('/index.php/api/phieuchi').then(response => {
                this.setState({
                  phieuchi: response.data
                })
              })
              var button = document.getElementById('btn-end')
              button.click()
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
            var button = document.getElementById('btn-end')
            button.click()
          })
          
        
      }
      handleChonNgayPhieuChi(event)
      {
          event.preventDefault();
          var daterange=document.getElementById('ngayxem').value;
          daterange=daterange.split("-");
          const phieuchixem = {
            datestart: daterange[0],
            dateend: daterange[1] 
          }
          axios.post('/index.php/api/phieuchixemngay',phieuchixem)
          .then(response => {
            // redirect to the homepage
           
                this.setState({
                  phieuchi: response.data
                })
             
           
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
           
          })
      }
      handleChonReset(event){
        event.preventDefault();
        axios.get('/index.php/api/phieuchi').then(response => {
            this.setState({
              phieuchi: response.data
            })
          })
      }
  render () {
    const { phieuchi } = this.state;
    const { tongtien } = this.state;
    return (
        <div>
 <div className="row">
        <div className="col-sm-12">
          <div className="white-box">
            <h3 className="box-title">Chi tiêu hằng ngày</h3>
            <div className="row">
     
         
       
           
          
              <div className="col-sm-12 col-lg-4">
                <div className="example">
                  <form onSubmit={this.handleChonNgayPhieuChi}>
                  <h5 className="box-title m-t-30">Chọn ngày xem</h5>
                  <div className="row row-inbtn">
                  <input id="ngayxem" type="text"  className="form-control input-daterange-datepicker" name="daterange" onChange={this.handleFieldChange} defaultValue="11/03/2020 - 11/04/2020" />
                  <button type="submit" className="btn btn-primary" >Xem</button>
                  <button className="btn btn-primary icon-list-demo m-l-30" onClick={this.handleChonReset}><i onClick={this.handleChonReset} className="ti-reload"></i></button>
                  </div>
                  
                  </form>
                 
                   </div>
              </div>

             
            
         
      </div>
      <div className="row">
        <div className="col-sm-12">
        <h5 className="box-title m-t-30">Tổng cộng: <span>{tongtien} VNĐ</span></h5>
        </div>
      
    
      </div>
      <div className="row">
      
        
        <div className="col-sm-12">
       
     
          <div className="table-responsive">
            <table className="table color-table primary-table" >
              <thead>
                <tr>
                  <th>Khoản chi</th>
                  <th>Ngày tháng năm chi</th>
                  <th>Số tiền</th>
                  <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                <th>Khoản chi</th>
                  <th>Ngày tháng năm chi</th>
                  <th>Số tiền</th>
                  <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
                </tr>
              </tfoot>
              <tbody>
              {phieuchi.map(pt => ( 
                <tr key={pt.id} id={"phieuchiitem"+pt.id} data-itempc={pt.id}>
                  <td data-idc={pt.id} className="khoanchi">{pt.khoanchi}</td>
                  <td data-idc={pt.id} className="ngaychichi">{pt.ngaychi}</td>
                  <td data-idc={pt.id} className="sotien">{pt.sotien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"}</td>
                  <td className="btnaction"><button data-idphieuchi={pt.id} onClick={this.handleDeletePhieuChi} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={pt.ID}><i className="fa fa-trash-o" data-idphieuchi={pt.id}></i></button><button onClick={this.handleChiTietPhieuChi} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idphieuchi={pt.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idphieuchi={pt.id}></i></button></td>
                 
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
              <h4 className="modal-title" id="exampleModalLabel1">Phiếu chi</h4> </div>
            <div className="modal-body">
              <form onSubmit={this.handleCreateNewPhieuChi}>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Ngày chi</label>
                  <input type="text" className="form-control" name="ngaychi" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
                  <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Số tiền</label>
                  <input type="text" className="form-control" name="sotien" id="recipient-name2" onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                  <label htmlFor="message-text"  className="control-label">Khoản chi:</label>
                  <textarea className="form-control" id="message-text1" name="khoanchi" onChange={this.handleFieldChange} />
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
              <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Phiếu chi</h4> </div>
            <div className="modal-body">
              <form onSubmit={this.handleUpdatePhieuChi}>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Ngày chi</label>
                  <input type="text" className="form-control" name="ngaychi" id="updatengaychi" onChange={this.handleFieldChange} /> </div>
                  <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Số tiền</label>
                  <input type="text" className="form-control" name="sotien" id="updatesotien" onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                  <label htmlFor="message-text"  className="control-label">Khoản chi:</label>
                  <textarea className="form-control" id="updatekhoanchi" name="khoanchi" onChange={this.handleFieldChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text"  className="control-label">ID:</label>
                  <input className="form-control" id="updateid" name="idphieu" onChange={this.handleFieldChange} />
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
      
        </div>
       
    )
  }
}

export default ChiTieuHangNgay