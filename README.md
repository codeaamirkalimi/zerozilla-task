# Zerozilla Tasks!

> -   1st API should create an agency and client in single request  
>     
> -   2nd API should update a client detail.  
>     
> -   3rd API should return name of agency along with client details which has top client(s) with maximum total bill, below fields should
> be part of response.


# Routes

     - localhost:7000/app/auth/signUp
     - localhost:7000/app/auth/login
     - localhost:7000/app/user/create/agency
     - localhost:7000/app/user/update/client/:clientId
     - localhost:7000/app/user/agency/detail

## Controllers

     - router.post('/signUp', authController.signUp);
     - router.post('/login', requireSignin, authController.signIn);
     - router.post('/create/agency', userController.createAgency);
     - router.put('/update/client/:clientId', userController.updateClientDetail);
     - router.get('/agency/detail', userController.getAgencyDetail);

## npm script

    npm run dev
    npm start
