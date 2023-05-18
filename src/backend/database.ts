import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

/*import mysql from 'mysql'

export const con = mysql.createConnection({
    host: 'banner.cba.pl',
    user: 'artemida',
    password: 'eiJR@S7Xah3yGvK',
    database: 'grupa1wsb',
})

con.connect((err) => {
    if (err) throw err
    console.log('Connected!')
})*/
