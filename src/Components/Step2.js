import React, {Component} from 'react'
import {Row, Col} from "reactstrap";
import ListProduct from "../Containers/ListProduct";
import ListProductItem from "../Containers/ListProductItem"
import Numpad from '../Containers/Numpad'
import SectionTopping from '../Containers/SectionTopping'
import axios from 'axios'
import BackNavigation from '../Containers/BackNavigation'
import BannerVideo from '../Containers/BannerVideo'
import Payment from '../Containers/Payment'
import IdleTimer from 'react-idle-timer';
import Masking from '../Containers/Masking'
import Scroll from '../Containers/Scroll'
import './../css/style.css'
import Recorder from 'recorder-js';

export class Step2 extends Component {

    constructor(props){
        super(props)

        this.state = {
            productItems : [],
            dataOrder: {},
            number : '',
            boolSelectProductItem : false,
            activeSelectedProductItem : null,
            activeSelectedProduct : null,
            videoUrl : 'indomie_default.mp4',
            qrVal : '', 
            cekPaymentInterval: false,
            // finish: false,
            boolDisableButton: false,
            timeout:1000 * 30 * 3,
            isTimedOut: false,
            secondsQr : 60,
            mask: 0,
            playAudioProcess: false,
            isRecording: false,
            blob : '',
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)

        this.audio = new Audio(`${process.env.PUBLIC_URL}/audio/proses.mp3`)

        this.audioContext =  new (window.AudioContext || window.webkitAudioContext)();
        this.recorder = new Recorder(this.audioContext, {
            // An array of 255 Numbers
            // You can use this to visualize the audio stream
            // If you use react, check out react-wave-stream
            // onAnalysed: data => console.log(data),
            numChannels:1
        });
    }
    

    componentDidMount(){
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => this.recorder.init(stream))
            .catch(err => console.log('Uh oh... unable to get stream...', err));
        this.audio.addEventListener('ended', () => this.setState({ playAudioProcess: false }));
        this.getDataProductItem(this.props.selectedProductHome)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.dataOrder !== prevState.dataOrder){
            console.log(this.state)
        }

        if(this.state.cekPaymentInterval !== prevState.cekPaymentInterval){
            if(this.state.cekPaymentInterval){
                this.cekPayment()
            }else{
                clearInterval(this.interval)
            }
        }

        if(this.state.activeSelectedProductItem !== prevState.activeSelectedProductItem){
            if(this.state.activeSelectedProductItem){
                this.changeGrid("open");
            }else{
                this.changeGrid("close");
            }
        }
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ playAudioProcess: false }));  
        clearInterval(this.interval)
    }

    bypass = () =>{
        axios.get('http://localhost/api/vending_machine/bypass.php', {
            params: {
                trxNo: this.state.dataOrder.trxNo
            }
        })
        .then(res => {
            console.log("bypass. . .")
        })
        .catch(function (error) {

        });
    }

    cekPayment = ()=>{
        let dataOrder = this.state.dataOrder
        
        this.interval = setInterval(()=>{ 
                axios.get('http://localhost/api/vending_machine/cekpayment.php', {
                    params: {
                        dataOrder
                    }
                })
                .then(res => {
                    if(res.data.pymstt === "PAID"){
                        this.setState({
                            ...this.state,
                            cekPaymentInterval : false,
                        }, ()=>{
                            
                            if(this.state.dataOrder.idProductCategory === "1"){//order PPOB
                                this.setState({
                                    ...this.state,
                                    mask: 1,
                                }, ()=>{
                                    setTimeout( () => {
                                        window.location.reload()
                                    }, 4000);
                                })
                            }else{//order mie
                                this.setState({
                                    ...this.state,
                                    mask: 2,
                                    playAudioProcess: !this.state.playAudioProcess
                                }, ()=>{
                                    if(this.state.playAudioProcess){
                                        this.audio.play()
                                        this.audio.addEventListener('ended', () => {
                                            document.getElementById("process_1").classList.add("d-none")
                                            document.getElementById("process_2").classList.remove("d-none")
                                            this.startRecordAudio()
                                            setTimeout( () => {
                                                this.stopRecordAudio()
                    
                                                this.setState({ ...this.state, playAudioProcess: false })
                                            }, 4000);
                                        });
                                    }else{
                                        this.audio.pause()
                                    }
                                })
                            }
                        })
                    }
                })
                .catch(function (error) {
                   
                });
                
            },
            
        5000)
    }

    // AXIOS GET DATA PRODUCT ITEMS USING HTTP REQUEST METHOD
    getDataProductItem(idProduct) {
        axios.get('http://localhost/api/vending_machine/productdetail.php', {
            params: {
              idproduct: idProduct
            }
        })
        .then(res => {
            this.setState({
                ...this.state,
                productItems :res.data,
                activeSelectedProduct : idProduct
            }, ()=>{
            })
        })
        .catch(function (error) {

        });
        
    }

    getQrCode(){
        this.setState({
            ...this.state,
            boolDisableButton: true
        })
        return axios.get('http://localhost/api/vending_machine/qris.php', {
            params:{
                amount: this.state.dataOrder.amount
            }
        }).then(response => {
            let dataOrder = this.state.dataOrder
            dataOrder['trxNo'] = response.data.data.transactionNo
            dataOrder['reffNo'] = response.data.data.referenceNo

            this.idleTimer.pause()

            this.setState({
                ...this.state,
                dataOrder,
                cekPaymentInterval: true,
                qrVal: response.data.data.qrisData
            }, ()=>{
                this.timerQr = setInterval(this.countDown.bind(this), 1000);
            })
        })
    }

    countDown() {
        let secondsQr = this.state.secondsQr - 1;
        this.setState({
            ...this.state,
            secondsQr
        });
        if (secondsQr === 0) { 
            clearInterval(this.timerQr);
            window.location.reload()
        }
    }

    //NUMPAD
    clickHandlerNumpad = (num)=>{
        let inputVal = this.state.number

        if(num === "delete"){
            if(inputVal !== ""){
                inputVal = inputVal.slice(0, -1)
            }
            
        }else if(num === "ok"){
            if(inputVal !== ""){
            }
        }else{
            inputVal += num
        }

        this.setState({
            ...this.state,
            number : inputVal
        })
    }

    clickHandlerProduct = (x)=>{
        var target = document.getElementById('menuStep3')
        var prdName = document.getElementById('productName')
        let videoUrl = 'indomie_default.mp4'

        if(x.videoUrl){
            videoUrl = x.videoUrl
        }

        this.setState({
            ...this.state,
            dataOrder :{
                idProductDetail : x.id,
                idProductCategory : x.idCategory,
                price : x.sellingPrice,
                code: x.code,
                method: x.method
            },
            number : '',
            boolSelectProductItem : true,
            activeSelectedProductItem: x.id,
            videoUrl
        },()=>{

        })

        if(x.action === "open"){
            target.style.width = "98%";
            target.style.border = "3px solid #dfdfdf";
            prdName.innerHTML = x.title
        }else{
            target.style.width = "0px";
            target.style.border = "0px";
            prdName.innerHTML = ""
        }

        var menuStep3 = document.getElementsByClassName("menuStep3")
        for(var i=0;i<menuStep3.length;i++){
            if("menuStep3_"+x.idCategory === menuStep3[i].id){
                document.getElementById(menuStep3[i].id).style.display = "block"
            }else{
                document.getElementById(menuStep3[i].id).style.display = "none"
            }
        }
    }

    changeHandlerSpiceLevel = (level, price) =>{
        let dataOrder = this.state.dataOrder
        dataOrder['spiceLevel'] = level
        dataOrder['spiceLevelPrice'] = price
        this.setState({
            ...this.state,
            dataOrder,
            boolSelectProductItem : false,
        }, () => {
            let spiceLevel = document.getElementsByClassName("spicelevel");
            let iconSpice = document.getElementById("sectionSpiceLevel").getElementsByTagName('img')
            for(var i=0;i<spiceLevel.length;i++){
                if(i<level){
                    spiceLevel[i].classList.add("selected-spice")
                    iconSpice[i].src = `${process.env.PUBLIC_URL}/images/icons/chili-colored.png`
                }else{
                    spiceLevel[i].classList.remove("selected-spice")
                    iconSpice[i].src = `${process.env.PUBLIC_URL}/images/icons/chili-empty.png`
                }
            }
            
            this.calc()
        })
    }

    changeHandlerTopping = (topping, price, action)=>{
        let dataOrder = this.state.dataOrder

        if(dataOrder['topping'] == null){
            dataOrder['topping'] = []
            dataOrder['toppingPrice'] = 0
        }
        
        if(action === "add"){
            dataOrder['topping'].push(topping)
            dataOrder['toppingPrice'] = Number(dataOrder['toppingPrice']) + Number(price)
        }else{
            if(dataOrder['topping'].length > 1){
                let index = dataOrder['topping'].indexOf(topping);
                if (index > -1) {
                    dataOrder['topping'].splice(index, 1);
                }
                dataOrder['toppingPrice'] = Number(dataOrder['toppingPrice']) - Number(price)
            }else{
                dataOrder['topping'] = null
                dataOrder['toppingPrice'] = 0
            }
        }

        this.setState({
            ...this.state,
            dataOrder,
            // boolSelectProductItem : false,
        }, () => {
            this.calc()
        })
    }

    changeHandlerQty = (data) => {
        let dataOrder = this.state.dataOrder
        dataOrder['qty'] = data
        this.setState({
            ...this.state,
            dataOrder,
            boolSelectProductItem : false,
        }, () => {
            let selection = document.getElementsByClassName("qty")
            for(var i=0;i<selection.length;i++){
                if(i+1 === data){
                    selection[i].classList.add("selected-qty")
                }else{
                    selection[i].classList.remove("selected-qty")
                }
            }
            this.calc()
        })
    }

    calc = () => {
        let dataOrder = this.state.dataOrder
        let topping = null
        let toppingPrice = 0
        let spiceLevel = 0
        let spiceLevelPrice = 0
        let amount = 0 
        let qty = 0

        if(dataOrder.qty === undefined){
            qty = 1
        }else{
            qty = dataOrder.qty
        }

        //topping
        if(dataOrder.topping === undefined){
            topping = null
        }else{
            topping = dataOrder.topping
        }

        if(dataOrder.toppingPrice === undefined){
            toppingPrice = 0
        }else{
            toppingPrice = dataOrder.toppingPrice
        }
        
        //spice
        if(dataOrder.spiceLevel === undefined){
            spiceLevel = 0
        }else{
            spiceLevel = dataOrder.spiceLevel
        }

        if(dataOrder.spiceLevelPrice === undefined){
            spiceLevelPrice = 0
        }else{
            spiceLevelPrice = dataOrder.spiceLevelPrice
        }

        amount = (Number(dataOrder.price) + Number(spiceLevelPrice) + Number(toppingPrice)) * Number(qty)

        dataOrder["amount"] = amount
        dataOrder["qty"] = qty
        dataOrder["spiceLevelPrice"] = spiceLevelPrice
        dataOrder["spiceLevel"] = spiceLevel
        dataOrder["customer_id"] = this.state.number

        dataOrder["topping"] = topping
        dataOrder["toppingPrice"] = toppingPrice
        this.setState({
            ...this.state,
            dataOrder
        }, ()=>{
            console.log("data order")
            console.log(this.state.dataOrder)
        })
    }

    payment = (type)=>{
        if(type === 'ppob'){
            if(this.state.number === ''){
                return alert('Anda belum memasukan nomor')
            }
        }
        this.calc()
        Promise.all([this.calc(), this.getQrCode(), this.mask()])
        .then((results) => {
            this.unmask()
            var target = document.getElementById('menuStep4')
            
            target.style.width = "100%";
            target.style.border = "3px solid #dfdfdf";
        });
    }

    cancelOrder = ()=>{
        window.location.reload()
    }

    closeStep3 = ()=>{
        this.setState({
            ...this.state,
            dataOrder: {},
            boolSelectProductItem : true,
            boolDisableButton : false,
            activeSelectedProductItem: null,
        }, ()=>{
            //close topping/numpad
            var target1 = document.getElementById('menuStep3')
            target1.style.width = "0px";
            target1.style.border = "0px";

            var target2 = document.getElementById('menuStep4')
            target2.style.width = "0px";
            target2.style.border = "0px";
        })
    }

    _onAction(e) {
        console.log('user did something', e)
        this.setState({isTimedOut: false})
    }
     
    _onActive(e) {
        console.log('user is active', e)
        this.setState({isTimedOut: false})
    }
     
    _onIdle(e) {
        console.log('user is idle', e)
        const isTimedOut = this.state.isTimedOut
        if (isTimedOut) {
            // this.props.history.push('/')
            window.location.reload()
            
        } else {
            // this.setState({showModal: true})
            this.idleTimer.reset();
            this.setState({isTimedOut: true})
        }
    }

    mask = ()=>{
        this.setState({
            ...this.state,
            mask : 3
        })
    }

    unmask = ()=>{
        this.setState({
            ...this.state,
            mask : 0
        })
    }

    startRecordAudio = () => {
        this.recorder.start()
            .then(() => {
                console.log('record')
                this.setState({
                    ...this.state,
                    isRecording : true
                })
            })
    }

    stopRecordAudio = () => {
        this.recorder.stop()
            .then(({blob, buffer}) => {
                console.log("record stop. . .")
                let filename_ = new Date().toISOString();
	            let filename = filename_.replace(/:/g, "_");
                let formData = new FormData()
                formData.append("audio_data", blob, filename);
                formData.append("trxNo", this.state.dataOrder.trxNo)

                axios.post('http://localhost/api/process/upload.php', formData,{ 
                    headers: {'Content-Type': 'multipart/form-data'} }
                ).then(res => {
                    this.setState({ blob, isRecording: false });
                    let audio1 = new Audio('http://localhost/api/process/nama.wav')
                    audio1.play()
                    document.getElementById("process_2").textContent = "No. Order "+this.state.dataOrder.trxNo
                    audio1.addEventListener('ended', () => {
                        document.getElementById("process_2").classList.add("d-none")
                        document.getElementById("process_3").classList.remove("d-none")
                        
                        audio1.removeEventListener('ended', () => {console.log('ended')})
                        window.location.reload()
                    });
                }).catch(function (error) {
                    console.log(error);
                });
                // buffer is an AudioBuffer
            });
        
    }

    y = 0//untuk titik awal scroll

    scroll = (direction, target) =>{
        const scrollHeight = 350
        var cont = document.getElementById(target);
        var btnUp = cont.getElementsByClassName("btn-scroll-up")[0];
        var btnDown = cont.getElementsByClassName("btn-scroll-down")[0];
        let opcityBtnUp, opcityBtnDown

        if(direction === "up"){
            this.y = Number(this.y) - scrollHeight;
            
            if(this.y > 0){
                opcityBtnUp = "1"
                opcityBtnDown = "1"
            }else{
                this.y = 0
                opcityBtnUp = "0.4"
                opcityBtnDown = "1"
            }
        }else{
            this.y = Number(this.y) + scrollHeight;

            if(this.y < 350){
                opcityBtnUp = "1"
                opcityBtnDown = "1"
            }else{
                this.y = 350
                opcityBtnUp = "1"
                opcityBtnDown = "0.4"
            }
        }

        btnUp.style.opacity = opcityBtnUp
        btnDown.style.opacity = opcityBtnDown

        document.getElementById(target).scrollTo(0, this.y);
    }

    changeGrid = (action) => {
        var target1 = document.getElementById("sectionPrd");
        var target2 = document.getElementById("sectionPrdDetail");
    
        if(action === "open"){
            target1.classList.remove("col-md-4", "col-lg-4");
            target1.classList.add("col-md-6", "col-lg-6");
    
            target2.classList.remove("col-md-8", "col-lg-8");
            target2.classList.add("col-md-6", "col-lg-6");
        }else{
            target1.classList.add("col-md-4", "col-lg-4");
            target1.classList.remove("col-md-6", "col-lg-6");
    
            target2.classList.add("col-md-8", "col-lg-8");
            target2.classList.remove("col-md-6", "col-lg-6");
        }
    }

    testrecord = ()=>{
        this.audio.play()
        this.audio.addEventListener('ended', () => {
            this.startRecordAudio()
            setTimeout( () => {
                this.stopRecordAudio()

                this.setState({ ...this.state, playAudioProcess: false })
            }, 4000);
        });
        
        // let formData = new FormData()
        // formData.append("test1", "test1")
        // formData.append("test2", "test2")

        // axios.post('http://localhost/api/process/upload.php', formData,{ 
        //     headers: {'Content-Type': 'multipart/form-data'} }
        // ).then(res => {
        //     console.log("test post")
        // })
    }

    render() {
        let {product, spiceLevel, topping} = this.props
        let listDataProduct = product.map((v, key) =>
                                <Row className="m-2"key={key}>
                                    <ListProduct activeSelectedProduct = {this.state.activeSelectedProduct} click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.product} bodytext={v.text} textColor={v.text_color} idCategory={v.id_category} id={v.id}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.productItems.map((v, key) => 
            <ListProductItem activeSelectedProductItem={this.state.activeSelectedProductItem} click={(dataPrdItem)=>this.clickHandlerProduct(dataPrdItem)} key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.name} bodytext={v.text} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id} code={v.code} videoUrl={v.video} method={v.method}></ListProductItem>
        )
        
        return (
            <div>
                <IdleTimer ref={ref => { this.idleTimer = ref }} element={document} onActive={this.onActive} onIdle={this.onIdle} onAction={this.onAction} debounce={250} timeout={this.state.timeout} />
                <BannerVideo videoUrl={this.state.videoUrl}></BannerVideo>
                <Masking mask={this.state.mask} />
                <Row>
                    <Col md="6">
                        <button className="col-md-12 btn btn-warning" onClick={()=>this.testrecord()}>
                            test record
                        </button>
                    </Col>
                </Row>
                <Row className="m-auto">
                    <Col md="4" lg="4" id="sectionPrd" className="p-0" style={{overflowY: 'auto', height: "1000px", transition: "all 400ms ease"}}>
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#eeeeee", color:"#000", border: "0px solid", overflowY:"scroll"}}>
                            <div style={{width:"100%", float:"left", padding:"0px 15px"}}>
                                <h3 id="productName" className="my-5 text-center">{}</h3>
                                <SectionTopping disableButton={this.state.boolDisableButton} close={(action)=>this.closeStep3(action)} dataOrder={this.state.dataOrder} changeQty = {(data) => this.changeHandlerQty(data)} changeSpiceLevel = {(level, price) => this.changeHandlerSpiceLevel(level, price)} boolSelectProductItem={this.state.boolSelectProductItem} spiceLevel={spiceLevel} topping={topping} changeTopping = {(topping, price, action) => this.changeHandlerTopping(topping, price, action)} clickOrder={(type)=>this.payment(type)}/>
                                <Numpad disableButton={this.state.boolDisableButton} clickOrder={(type)=>this.payment(type)} close={(action)=>this.closeStep3(action)} numberValue={this.state.number} click={(num)=>this.clickHandlerNumpad(num)} dataOrder={this.state.dataOrder}></Numpad>
                            </div>
                        </div>
                        <div className="row m-2">
                            <BackNavigation click={this.props.previousStep}></BackNavigation>
                        </div>
                        {listDataProduct}
                        <Scroll click={(direction)=>this.scroll(direction, "sectionPrd")}/>
                    </Col>
                    <Col md="8" lg="8" id="sectionPrdDetail"  className="p-0" style={{overflowY: 'auto', height: "1000px", transition: "all 400ms ease"}}>
                        <div id="menuStep4" className="m-2 row" style={{}}>
                            <Payment seconds={this.state.secondsQr} startTimerQr={this.state.startTimerQr} intv={this.state.cekPaymentInterval} qrVal={this.state.qrVal} cancelOrder={()=>this.cancelOrder()} bypass={()=>this.bypass()}/>
                        </div>
                        <Row className="mx-auto row">
                        {listDataProductItems}
                        </Row>
                        <Scroll click={(direction)=>this.scroll(direction, "sectionPrdDetail")}/>
                    </Col>
                </Row>
                
            </div>
            
        )
    }
}

export default Step2