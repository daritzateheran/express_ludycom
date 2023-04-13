import jwt from 'jsonwebtoken';


export const createJWT = ( userId, name ) => {
    const {sign } = jwt
    return new Promise( (resolve, reject) => {

        const payload = { userId, name };
        sign( payload, process.env.APIKEY, {
            expiresIn: '1h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('Token fails');
            }
            resolve( token );
        })


    })
}
