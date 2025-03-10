class Payload {
    // baseado em um projeto java do github Reketz: https://github.com/Reketz/QRCodePix?tab=readme-ov-file
    static ID_PAYLOAD_FORMAT_INDICATOR = "00";
    static ID_MERCHANT_ACCOUNT_INFORMATION = "26";
    static ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
    static ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
    static ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = "02";
    static ID_MERCHANT_CATEGORY_CODE = "52";
    static ID_TRANSACTION_CURRENCY = "53";
    static ID_TRANSACTION_AMOUNT = "54";
    static ID_COUNTRY_CODE = "58";
    static ID_MERCHANT_NAME = "59";
    static ID_MERCHANT_CITY = "60";
    static ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
    static ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
    static ID_CRC16 = "63";
    
    constructor() {
        this.pix_key = null;
        this.description = null;
        this.merchant_name = null;
        this.merchant_city = null;
        this.txid = null;
        this.amount = null;
    }
    
    set_pix_key(pix_key) {
        this.pix_key = pix_key;
        return this;
    }
    
    set_description(description) {
        this.description = description;
        return this;
    }
    
    set_merchant_name(merchant_name) {
        this.merchant_name = merchant_name;
        return this;
    }
    
    set_merchant_city(merchant_city) {
        this.merchant_city = merchant_city;
        return this;
    }
    
    set_txid(txid) {
        this.txid = txid;
        return this;
    }
    
    set_amount(amount) {
        this.amount = (Math.ceil(parseFloat(amount) * 100) / 100).toFixed(2);
        return this;
    }
    
    get_additional_data_field_template() {
        const tx = this._get_format_size(Payload.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, this.txid);
        return this._get_format_size(Payload.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, tx);
    }
    
    get_merchant_account_information() {
        const gui = this._get_format_size(Payload.ID_MERCHANT_ACCOUNT_INFORMATION_GUI, "br.gov.bcb.pix");
        const key = this._get_format_size(Payload.ID_MERCHANT_ACCOUNT_INFORMATION_KEY, this.pix_key);
        let desc = "";
        if (this.description && this.description.length > 0) {
            desc = this._get_format_size(Payload.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, this.description);
        }
        return this._get_format_size(Payload.ID_MERCHANT_ACCOUNT_INFORMATION, gui + key + desc);
    }
    
    _get_format_size(id_field, value) {
        const size = String(value.length).padStart(2, '0');
        return id_field + size + value;
    }
    
    _get_crc16(buffer) {
        let wCrcIn = 0xFFFF;
        const wCPoly = 0x1021;
        
        for (let i = 0; i < buffer.length; i++) {
            const b = buffer.charCodeAt(i);
            for (let j = 0; j < 8; j++) {
                const bit = ((b >> (7 - j)) & 1) === 1;
                const c15 = ((wCrcIn >> 15) & 1) === 1;
                wCrcIn <<= 1;
                if (c15 ^ bit) {
                    wCrcIn ^= wCPoly;
                }
            }
        }
        
        wCrcIn &= 0xFFFF;
        return wCrcIn ^ 0x0000;
    }
    
    get_payload() {
        const payload = (
            this._get_format_size(Payload.ID_PAYLOAD_FORMAT_INDICATOR, "01") +
            this.get_merchant_account_information() +
            this._get_format_size(Payload.ID_MERCHANT_CATEGORY_CODE, "0000") +
            this._get_format_size(Payload.ID_TRANSACTION_CURRENCY, "986") +
            this._get_format_size(Payload.ID_TRANSACTION_AMOUNT, this.amount) +
            this._get_format_size(Payload.ID_COUNTRY_CODE, "BR") +
            this._get_format_size(Payload.ID_MERCHANT_NAME, this.merchant_name) +
            this._get_format_size(Payload.ID_MERCHANT_CITY, this.merchant_city) +
            this.get_additional_data_field_template() +
            Payload.ID_CRC16 + "04"
        );
        
        const crcRes = this._get_crc16(payload);
        return payload + crcRes.toString(16).toUpperCase().padStart(4, '0');
    }
}

function generateQRCode() {
    const pixKey = "";
    const description = "";
    const merchantName = "";
    const merchantCity = "";
    const amount = "";
    const txid = "";
    
    if (!pixKey || !merchantName || !merchantCity || !amount || !txid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const payload = new Payload();
    payload.set_pix_key(pixKey)
          .set_description(description)
          .set_merchant_name(merchantName)
          .set_merchant_city(merchantCity)
          .set_amount(amount)
          .set_txid(txid);
    
    const qrCodeContent = payload.get_payload();
    const payloadEl = document.getElementById('payload');
    payloadEl.textContent = qrCodeContent;
    payloadEl.classList.remove('hidden');
    
    document.getElementById('qrcode').innerHTML = '';

    new QRCode(document.getElementById('qrcode'), {
        text: qrCodeContent,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
    });
    
    document.getElementById('downloadBtn').classList.remove('hidden');
    document.getElementById('copyBtn').classList.remove('hidden');
}