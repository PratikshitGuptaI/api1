const sequelize = require('../config/db')
const vendor_payments = sequelize.VendorPayment;
const invoiceItems = sequelize.InvoiceItems;

class InvoiceRepo {

    async createRequest(booking_id, proof_url, otp) {
        const request = await vendor_payments.create({ booking_id, proof_url, otp });
        return request;
    }
    async generateRandomOtp() {
        const randomSixDigitNumber = await generateRandomNumber(100000, 999999);
        const randomAlphabet = await generateRandomAlphabet();

        const result =
            randomAlphabet + randomSixDigitNumber
        // {
        // number: randomSixDigitNumber,
        // alphabet: randomAlphabet,
        // };

        return result;
        async function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        async function generateRandomAlphabet() {
            const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const randomIndex = Math.floor(Math.random() * alphabets.length);
            return alphabets.charAt(randomIndex);
        }
    }
    async confirmRequest(id) {
        const request = await vendor_payments.update({
            is_verified: 1,
        },
            {
                where:
                    { id: id }
            })
        return request;    
    }

    async getRequests(req, res) {
        const list = await vendor_payments.findAll();
        return list
    }
}

module.exports = InvoiceRepo;