import * as nodemailer from 'nodemailer';


export const transporter: nodemailer.Transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'skycomercialprogramming@gmail.com',
            pass: 'rezh xgoh wlly bfdx'
        },
    },
    {
        from: {
            name: '<no-reply> Sky Comercial Programing',
            address: 'skycomercialprogramming@gmail.com',
        },
    },
);

