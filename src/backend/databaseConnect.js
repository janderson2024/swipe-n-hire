import { connect } from '@planetscale/database'

const config = {
    url: process.env['database_url'] 
}

const conn = connect(config)

export default conn;