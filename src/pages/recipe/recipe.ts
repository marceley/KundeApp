import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  details: any;
  userImages: any;
  image: any;

  imageURI: any;
  imageFileName: any;
  uploadErrorString: any;

  loading: Boolean = true;
  error: Boolean = false;
  errorMessage: String = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public translate: TranslateService,
    private camera: Camera,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.image = normalizeURL(imageData);
      this.imageURI = normalizeURL(imageData);
      //console.log("Image", this.image, "ImageURI", this.imageURI);

      this.uploadFile();

    }, (err) => {
      // Handle error
    });

  }

  selectPhotoFromLibrary() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {

      this.image = normalizeURL(imageData);
      this.imageURI = normalizeURL(imageData);
      //console.log("HALLO", this.image, this.imageURI);

      this.uploadFile();
    }, (err) => {
      // Handle error
    });

  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });

    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      chunkedMode: false,
      fileName: "image.jpg",
      headers: {
        //"Accept": "application/json",
        //"Accept-Language": "da-DK;q=1, en-DK;q=0.9",
        "Connection": "close",
        "Authorization": this.apiProvider.getAuth(), 
        "Content-Type": "multipart/form-data; boundary=Boundary+15C7DAC7AFA65873" //"multipart/form-data"
      }
    }

    //console.log("---", JSON.stringify(options.headers));

    //console.log("---", this.details.Id);
    var uploadUrl = this.apiProvider.getUploadRecipeUrl(this.details.Id)
    //console.log("...", uploadUrl);

    fileTransfer.upload(this.imageURI, uploadUrl, options)
      .then((data) => {
        console.log(data + " Uploaded Successfully");
        this.imageFileName = uploadUrl; //"http://192.168.0.7:8080/static/images/ionicfile.jpg"
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log("Error uploading", JSON.stringify(err));
        this.uploadErrorString = JSON.stringify(err);
        loader.dismiss();
        this.presentToast(err.Text);
      }).catch(err => {
        this.uploadErrorString = "Catch: " + JSON.stringify(err);
      });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 10000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');

    var recipe = this.navParams.get("recipe");

    this.apiProvider.getRecipe(recipe.Details)
      .subscribe(data => {
        //console.log("getNewItems() - data", data);
        if (data && data["d"]) {
          this.details = data["d"];
          this.loading = false;
          this.error = false;
          if (this.details.RequestUserImages) {
            let url = "https://mobileapi.aarstiderne.com/v7/recipe/images/3488eb45-9096-4a93-bfb6-021bbce16d16";
            // let url = this.details.UserImages;
            this.apiProvider.getRecipeUserImages(url).subscribe(data => {
              this.userImages = data["d"];
            })
          }
        }
      }, error => {
        //console.log("getNewItems() - error", error);
        this.loading = false;
        this.error = true;
        this.errorMessage = error;
      });

  }


}
