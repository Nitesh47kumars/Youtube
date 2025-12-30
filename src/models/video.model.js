import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongooseAggregatePaginate

const videoSchema = new Schema(
    {
        videoFile:{
            type: String,
            required: [true,"VideoFile is Required."]
        },
        thumnail:{
            type: String,
            required: [true,"thumnail is Required."]
        },
        title:{
            type: String,
            required: [true,"Title is Required."]
        },
        description:{
            type: String,
            required: [true,"Description is Required."]
        },
        duration:{
            type: Number,
            required: [true,"Duration is Required."]
        },
        views:{
            type: Number,
            default: 0
        },
        isPublished:{
            type: Boolean,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId(),
            ref: "User"
        }
    },{timestamps: true}
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema);