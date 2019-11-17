const express = require('express');
const app = express();
const port = process.env.PORT || 1000;
const bodyparser = require('body-parser');
const dbConnection = require('./config/dbConn'); //importing database from config folder
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const authRouter = require('./routes/users/auth');
const clientInvoiceRouter = require('./routes/users/invoice');
const appointmentRouter = require('./routes/users/appointment');
const documentUploadRouter = require('./routes/users/document');
const adminAuthRouter = require('./routes/admin/adminAuth');
const companyExpenseRouter = require('./routes/admin/companyExpenses');
const clientsAppointmentRouter = require('./routes/admin/clientsAppointment');
const getClientsRouter = require('./routes/admin/getClient');
const adminCreateInvoice = require('./routes/admin/clientsInvoice');

//placing cors options for origin and other access details
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(passport.initialize());


app.use(cors(corsOptions));

//initializing usage of routers for users
app.use('/auth', authRouter);
app.use('/client', clientInvoiceRouter, appointmentRouter, 
					documentUploadRouter);

//initializing usage of routers for admins
app.use('/adminAuth', adminAuthRouter);
app.use('/admin', getClientsRouter, companyExpenseRouter, 
					clientsAppointmentRouter, adminCreateInvoice);

app.get('/', (req, res, next) => {
	res.send('Welcome to PMS API served on port: ' + port)
})


//listening to port
app.listen(port, process.env.IP, () => {
        console.log('PMS Server is running on port ' + port);        
})