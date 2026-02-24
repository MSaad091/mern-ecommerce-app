


const isAdmin = (req,res,next) => {

    if (req.user.role!== "admin") {
        return res.status(404).json({
            success:false,
            message:"Admin Access Only"
        })
    }
    next();

}
export {isAdmin}

