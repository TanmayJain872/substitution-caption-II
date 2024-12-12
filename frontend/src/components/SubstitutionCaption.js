/* jshint esversion: 11 */

import React from "react";
import { gql, useSubscription } from "@apollo/client";

import "../styles/SubstitutionCaptionStyles.css";

const CAPTION_ADDED = gql`
    subscription {
        captionAdded {
            id
            playerOut
            numberOut
            playerIn
            numberIn
            time
        }
    }
`;

const SubstitutionCaption = () => {
    const { data, loading, error } = useSubscription(CAPTION_ADDED);

    if (error) {
        console.error("Subscription error:", error);
        return (
            <p style={{ color: "red", fontWeight: "bolder" }}>
                {error?.message}
            </p>
        );
    }
    
    if (loading) return <div>Loading...</div>;
    

    return (        
        <div id="substitution-card" key={data?.captionAdded?.id}>
            <div class="header">LUDO MAGIC LEAGUE</div>
            <div class="content">
                <div class="player-section player-out">
                    <img id="player-out-img" class="player-img" src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png" alt="Player Out" />
                    <div>
                        <div class="name">{data?.captionAdded?.playerOut}</div>
                        <div class="number">{data?.captionAdded?.numberOut}</div>
                    </div>
                    <div class="arrow">
                        <div class="arrow-out">
                            OUT
                        </div>
                        {/* ⬇️ */}
                    </div>
                </div>
                <div class="time">{data?.captionAdded?.time}</div>
                <div class="player-section player-in">
                    <img id="player-in-img" class="player-img" src="https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg" alt="Player In" />
                    <div>
                        <div class="name">{data?.captionAdded?.playerIn}</div>
                        <div class="number">{data?.captionAdded?.numberIn}</div>
                    </div>
                    <div class="arrow">
                        <div class="arrow-in">IN</div>
                        {/* ⬆️ */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubstitutionCaption;
