import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';
import ReactGallery from 'react-photo-gallery';
import Lightbox from 'react-images';

class DanhSachAnhDieuTri extends Component {

    constructor(props){
        super(props);
        this.state = {
            images : [],
            selectAll: false,
            selected : false,
            selected_count : true,
            iddieutri: props.iddieutri
        };
        this.verifyMarked = this.verifyMarked.bind(this)
        this.deleteImages = this.deleteImages.bind(this)
        this.selectImage = this.selectImage.bind(this)
    }

    componentDidMount(){
        axios.get('/index.php/api/photodieutri/'+this.state.iddieutri)
        .then(response => {
            const images = response.data;
           
            console.log(images)
            this.setState({
              images: images
            })
         
        
        })
    }

    selectImage(event, obj) {
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

    deleteImages(e) {
        e.preventDefault();
        let marked = this.state.images.filter(image => {
            return image.selected;
        });
        marked.map(image => {
            
            axios.get('/index.php/api/xoaanhdieutri/'+image.id).then(response => {
                if(response.data.deleted){
                    this.setState({
                        images : this.state.images.filter(img => {
                            return img.id !== image.id
                        })
                    });
                
                }
                axios.get('/index.php/api/photodieutri/'+this.state.iddieutri)
                .then(response => {
                    const images = response.data;
                   
                    console.log(images)
                    this.setState({
                      images: images
                    })
                 
                
                })
            })
        })
    }

    render() {
        const { images } = this.state
        var photos = images.map(image => {
            return {
                src : 'http://103.75.185.175/public/uploads/dieutri/' + image.url,
                width : '500px',
                height : '400px',
                id :  image.id
            }
        })
        const anhnguyengoc = this.props.anhnguyengoc
        
    
       
        
        return (
           
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
                
                {this.props.dataanhdieutri.length ?
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

        );
    }
}
export default DanhSachAnhDieuTri