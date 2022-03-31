import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';
import ReactGallery from 'react-photo-gallery';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';
class ThemAnhLichHen extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            images : [],
            hinhanhs : [],
            previewimages : [],
            progress : 0,
            uploading : true,
            selectAll: false,
            selected : false,
            selected_count : true,
            idkhachhang: this.props.match.params.idkh,
            idkhammoi: this.props.match.params.idkm,
            iddieutri: '0',
            idlich: '0',
            dataanhdieutri: [],
            anhnguyengoc: [],
            supported_mime : [
                'image/jpeg',
                'image/png',
            ]
        }
        this.verifyMarked = this.verifyMarked.bind(this)
        this.deleteImages = this.deleteImages.bind(this)
        this.selectImage = this.selectImage.bind(this)
    }
    componentDidMount(){
        const scripts = [
          
            '/public/app_assets/js/datatable/custom.js'
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
    }
    componentWillMount(){
        const scripts = [
          '/public/app_assets/js/datatable/custom.js',
          '/public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
          '/public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
          '/public/app_assets/js/jasny-bootstrap.js',
          '/public/app_assets/js/mask.js',
          '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
          '/public/app_assets/js/custome-app.js',
          '/public/app_assets/plugins/bower_components/gallery/js/jquery.isotope.min.js',
          '/public/app_assets/plugins/bower_components/gallery/js/animated-masonry-gallery.js',
          '/public/app_assets/js/datatable/custom.js',
		  '/public/app_assets/js/lightbox.min.js'
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
     
      axios.get('/index.php/api/photolichhen/'+this.state.idkhammoi)
      .then(response => {
          const images = response.data;
         
          console.log(images)
          this.setState({
            anhnguyengoc: images,
            images: images
          })
          let photos = images.map(image => {
            return {
                src : 'http://103.75.185.175/public/uploads/lichhen/' + image.url,
                width : '500px',
                height : '400px',
                id :  image.id
            }
        })
        this.setState({
            dataanhdieutri : photos
        })
      })
      }
    onDrop(images){
        let files = Array.from(images);
	
        files.forEach((file) => {
            let reader = new FileReader();
         var image = file;
    new Compressor(image, {
      quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
      success: (file) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.        
       reader.onloadend = () => {
                file  = { ...file, preview: reader.result};
                file  = { ...file, iddieutri: this.state.iddieutri};
                file  = { ...file, idkhachhang: this.state.idkhachhang};
                file  = { ...file, idkhammoi: this.state.idkhammoi};
                file  = { ...file, idlich: this.state.idlich};
                
                this.setState({    
                    hinhanhs: [...this.state.hinhanhs, file],
                    
                });
            }
            reader.readAsDataURL(file);
		
      },
    });
            
        });
    }

    onDropRejected(images){
        if(images.length){
            toastr.error('Please upload valid image files. Supported extension JPEG and PNG', 'Invalid MIME type')
        }
    }

    removeDroppedFile(preview, e = null){
        this.setState({
            hinhanhs : this.state.hinhanhs.filter((image) => {
                return image.preview !== preview
            })
        })
    }

    uploadFiles(){
        let hinhanhs = this.state.hinhanhs,
            config = { headers: { 'Content-Type': 'multipart/form-data' } },
            total_files = this.state.hinhanhs.length,
            uploaded = 0;

        this.setState({
            uploading : true
        });
		
        hinhanhs.map((image) => {
        
            axios.post("/index.php/api/photolichhen", image).then(response => {
                const done = response.data;
                if(done){
                    this.removeDroppedFile(image.preview);
                    this.calculateProgress(total_files, ++uploaded);
                }
               
            });
        });
    }

    calculateProgress(total, uploaded){
        let percentage = (uploaded / total) * 100;
        this.setState({
            progress : percentage,
            uploading : percentage !== 100
        });

        if(percentage === 100){
            alert('Ảnh đã up thành công');
            axios.get('/index.php/api/photolichhen/'+this.state.idkhammoi)
            .then(response => {
                const images = response.data;
               
                console.log(images)
                this.setState({
                  anhnguyengoc: images,
                  images: images
                })
                let photos = images.map(image => {
                  return {
                      src : 'http://103.75.185.175/public/uploads/lichhen/' + image.url,
                      width : '500px',
                      height : '400px',
                      id :  image.id
                  }
              })
              this.setState({
                  dataanhdieutri : photos
              })
            })
        }
        
    }
    selectImage(event, obj) {
       
        document.getElementById("hinhanhduocmo").src=obj["photo"]["src"];
        document.getElementById("nutxemanh").click();
       var image= document.getElementsByClassName("imganhlichhen");
       if(!image[obj.index].classList.contains("activeselected"))
       {
        image[obj.index].classList.add("activeselected");
       }
       else
       {
        image[obj.index].classList.remove("activeselected");
       }
        let images = this.state.images;
        images[obj.index].selected = !images[obj.index].selected;
        this.setState({
            images: images,
        } ,() => {
            this.verifyMarked();
        });
    }

    verifyMarked(){
        let marked = false,
            mark_count = 0;
        this.state.images.map(image => {
            if(image.selected){
                marked = true;
                mark_count += 1;
            }
        });
        this.setState({
            selected : marked,
            selected_count : mark_count
        })
    }
	handleOpenImage(e)
	{
		console.log(e);
	}
    deleteImages(e) {
        e.preventDefault();
        let marked = this.state.images.filter(image => {
            return image.selected;
        });
        marked.map(image => {
            
            axios.get('/index.php/api/xoaanhlichhen/'+image.id).then(response => {
                if(response.data.deleted){
                    this.setState({
                        images : this.state.images.filter(img => {
                            return img.id !== image.id
                        })
                    });
                
                }
                axios.get('/index.php/api/photolichhen/'+this.state.idkhammoi)
                .then(response => {
                    const images = response.data;
                   
                    console.log(images)
                    this.setState({
                      images: images
                    })
                 
                this.setState({
                    selected : false
                })
                })
            })
        })
    }
    render() {
        
        const { iddieutri,dataanhdieutri,anhnguyengoc,images,hinhanhs,idkhammoi,idkhachhang  } = this.state
        var photos = images.map(image => {
            return {
                src : 'http://103.75.185.175/public/uploads/lichhen/' + image.url,
                width : '500px',
                height : '400px',
                id :  image.id,
                className : "imganhlichhen"
            }
        })
        return (
           
            <div className="uploader">
                 <div className="row">
            <div className="col-md-12 col-xs-12 m-b-20">
            <section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li className="tab-current"><Link to={'/dieu-tri-theo-lich/'+idkhachhang+'/'+idkhammoi} className="sticon"><span>Chi tiết điều trị</span></Link></li>
  
   <li className="tab-current"><Link to={'/kham-moi/'+idkhachhang} className="sticon"><span>QUAY LẠI</span></Link></li>
 

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
                </div>
                </div>
                <div className="text-center">
                {(() => {
                  if (localStorage.getItem('userrole')!="6") {
                      return(
                          <div>
                                 <Dropzone
                    onDropAccepted={this.onDrop.bind(this)}
                    onDropRejected={this.onDropRejected.bind(this)}
                    className="btn btn-dark"
                    accept={this.state.supported_mime}
                >
                  {({getRootProps, getInputProps}) => (
<div {...getRootProps()}>
  <input {...getInputProps()} />
  <p>Kéo hoặc click vào đây</p>
</div>
)}
                </Dropzone>
                          </div>
                      )
                 
                  }
                })()}
                  

                    {this.state.hinhanhs.length > 0 &&
                        <button
                            className="btn btn-dark uploadBtn"
                            onClick={this.uploadFiles.bind(this)}
                        >
                            Upload
                        </button>
                    }

                </div>

                {this.state.hinhanhs.length ?
                    <Fragment>
                        {this.state.uploading &&
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{width : this.state.progress}}
                                    aria-valuenow={this.state.progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"/>
                            </div>
                        }

<div id="gallery-content-flex">
            <div id="gallery-content-center-flex">
                        {
                                this.state.hinhanhs.map((file) =>
                                    <div key={file.preview} className="image">
                                        <span
                                            className="close"
                                            onClick={this.removeDroppedFile.bind(this, file.preview)}
                                        >X</span>
                                        <img src={file.preview} alt="" className="xemanh" onClick={this.handleOpenImage} />
                                    </div>
                                )
                            }
                       </div>
                       </div>
                    </Fragment>
                    :
                    <div className="no-images">
                        <h5 className="text-center">
                            Chọn ảnh trước khi điều trị
                        </h5>
                    </div>
                }
          <div id="gallery-content">
            <div id="gallery-content-center">
           
            {this.state.selected > 0 &&
                <button
                    className="btn btn-danger deleteBtn"
                    onClick={this.deleteImages}
                >
                   Xóa {this.state.selected_count} Ảnh đã chọn
                </button>
                }
                
                {dataanhdieutri.length ?
                    <ReactGallery
                        photos={photos}
                        onClick={this.selectImage}
                        ImageComponent={photos} />
                    :
                    <div className="no-images">
                        <h5 className="text-center">
                            Hiện tại không có ảnh nào trong gallery
                        </h5>
                    </div>
                }
                   
      
</div>
            </div>
            <button type="button" className="hidden btn btn-primary" id="nutxemanh" data-toggle="modal" data-target="#openHinhAnh" data-whatever="@mdo" style={{marginLeft: '20px'}}><i className="fa fa-plus"></i> Xem ảnh</button>
            <div className="modal fade" id="openHinhAnh" tabIndex={-1} role="dialog" aria-labelledby="openHinhAnh">
<div className="modal-dialog" role="document" style={{maxWidth: '60%', width: '30%'}}>
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
    <img src="" id="hinhanhduocmo" style={{ width: '100%' }} />
    <div className="modal-body">
    <button type="button" className="btn btn-default" data-dismiss="modal" id="btndongdulieu">Đóng</button>
                                           
    </div>
 
  </div>
</div>
</div>
            </div>
</div>
        );
    }
}
export default ThemAnhLichHen