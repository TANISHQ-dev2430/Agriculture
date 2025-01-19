import RentalItemDescription from "./RentalItemDescription";
import RentalItems from "./RentalItems";

export default function Rental()
{
    return(
        <div className="rental-page">
            <h2>AgroBazaar Rentals</h2>
            <div className="rental-page-content">
                <RentalItems />
                <RentalItemDescription />
            </div>
        </div>
    );
}