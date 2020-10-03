class MercadoPagoController{
    constructor(MercadoPagoService){
        this.MercadoPagoService = MercadoPagoService;
    }

    async getMercadoPagoLink(req, res) {
        const { title, price, unit, img } = req.body;
        console.log('Check',title, price, unit, img);
        try {

            const checkout = await this.MercadoPagoService.createPaymentMercadoPago(
                title, // nombre del producto o servicio
                price, //precio del producto o servicio
                unit,  //cantidad que estamos vendiendo
                img  // imagen de referencia del producto o servicio
              );
              return res.redirect(checkout.init_point); 
              //si es exitoso los llevamos a la url de Mercado Pago
        } catch (error) {
            return res.status(500).json({
                error: true,
                msg: "Hubo un error con Mercado Pago"
              });
        }

    }
  



}

module.exports = MercadoPagoController;