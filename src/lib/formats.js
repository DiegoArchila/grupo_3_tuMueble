/**Format the numbers to format currency,
 * this to COP=Colombian PESO Money
 * 
 */
const toCOP= new Intl.NumberFormat("es-CO", {
    style:"currency",
    currency:"COP",
    minimumFractionDigits:0
});

module.exports={
    toCOP
}