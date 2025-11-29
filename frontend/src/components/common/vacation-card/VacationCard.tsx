import { useMemo, useState } from "react";
import useService from "../../../hooks/use-service";
import { useAppDispatcher, useAppSelector } from "../../../redux/hooks";
import LikesService from "../../../services/auth-aware/likesService";
import type Vacation from "../../../models/Vacation";
import { addLike, removeLike } from "../../../redux/likes-slice";
import { decrementLikes, incrementLikes } from "../../../redux/vacations-slice";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: Vacation;
}

export default function VacationCard({ vacation }: VacationCardProps) {
    const dispatch = useAppDispatcher();
    const likesService = useService(LikesService);
    const { likedIds } = useAppSelector(state => state.likesSlice);

    const isLiked = useMemo(
        () => likedIds.includes(vacation.id),
        [likedIds, vacation.id]
    );

    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);

    async function toggle() {
        if (processing) return;
        setProcessing(true);

        try {
            if (isLiked) {
                dispatch(removeLike(vacation.id));
                dispatch(decrementLikes(vacation.id));
                await likesService.unlike(vacation.id);
            } else {
                dispatch(addLike(vacation.id));
                dispatch(incrementLikes(vacation.id));
                await likesService.like(vacation.id);
            }
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div className="vacation-card">

            <div className="vacation-card-image">
                {loading && (
                    <div className="spinner-wrapper">
                        <div className="spinner-circle"></div>
                    </div>
                )}
                <img
                    src={vacation.imageUrl}
                    alt={vacation.destination}
                    onLoad={() => setLoading(false)}
                />
            </div>

            <div className="vacation-content">

                <h3 className="vacation-title">{vacation.destination}</h3>

                <p className="vacation-description">{vacation.description}</p>

                <div className="vacation-dates">
                    <span>Start Date <br/>{new Date(vacation.startDate).toLocaleDateString("he-IL")}</span>
                    <span>—</span>
                    <span>End Date <br/>{new Date(vacation.endDate).toLocaleDateString("he-IL")}</span>
                </div>

                <span className="vacation-price">
                    ₪{vacation.price.toLocaleString()}
                </span>

                <div className="vacation-actions">
                    <button
                        onClick={toggle}
                        disabled={processing}
                        className={isLiked ? "liked" : ""}
                    >
                        {isLiked ? "Unlike" : "Like"}
                    </button>

                    <div className="vacation-likes">
                        ❤️ {vacation.likes}
                    </div>
                </div>

            </div>
        </div>
    );
}
