
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import BangInDonThuoc from "./PrintDonThuoc";

class InDonThuoc extends Component {
    constructor (props) {
    super(props)
    this.state = {
            khachhang: [],
            chitietdonthuoc: [],
            iddonthuoc: this.props.match.params.id,
            idkhachhang: this.props.match.params.idkh
    }
}
    componentDidMount(){
 
      
          axios.get('/index.php/api/chitietkhachhang/'+this.state.idkhachhang).then(response => {
    
            this.setState({
              khachhang: response.data
            })
          
        })
        axios.get('/index.php/api/donthuoc/'+this.state.iddonthuoc).then(response => {
    
          this.setState({
            chitietdonthuoc: response.data
          })
        
      })
   
    
    }


  render() {
   const { khachhang,idkhachhang,iddonthuoc,chitietdonthuoc } = this.state
 
    return (
    <BangInDonThuoc idkhachhang={idkhachhang} datakhachhang={khachhang} chitietdonthuoc={chitietdonthuoc} iddonthuoc={iddonthuoc}  />
  
    );
  }
}

export default InDonThuoc;