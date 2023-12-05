import { useDetailEvents } from "../hooks/useDetailEvents";

const DetailPage = () => {
    const { singleEvent, isLoading } = useDetailEvents();
    if (isLoading) {
        return <p>Loading data...</p>;
    } else {
        return (
            <div>
                <h1>dettaglio</h1>
                <img src={singleEvent?.coverImage} alt="img" />
                <p>{singleEvent?.id}</p>
                <p>{singleEvent?.name}</p>
                <p>{singleEvent?.description.long}</p>
                <p>{singleEvent?.includedDrinks}</p>
                <p>{singleEvent?.isAperitivoIncluded}</p>

                {singleEvent?.isAperitivoIncluded === true &&
                    singleEvent?.includedDishes.map((e, i) => {
                        return (
                            <p key={i}>
                                {e.name} - {e.description} - {e.allergens}
                            </p>
                        );
                    })}
            </div>
        );
    }
};

export default DetailPage;