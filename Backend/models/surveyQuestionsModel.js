const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const SurveySectionSchema = new Schema({
    survey_section_key: {
        type: String,
    },
    survey_key: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admins', // Assuming 'users' is the name of the users collection
        required: true,
    },
    survey_questions_num: {
        type: String,
    },
    survey_questions_name: {
        type: String,
    },
    survey_questions_required: {
        type: Number,
        default: 0,
    },
    survey_questions_toggle: {
        type: String,
    },
    questions_note: {
        type: String,
    },
    questions_category: {
        type: String,
    },
    questions_external_reference_id: {
        type: String,
    },
    questions_link_to_question: {
        type: String,
    },
    question_position: {
        type: Number,
    },
    formula_add_filed: {
        type: String,
    },
    formula_add_operator: {
        type: String,
    },
    formula_add_function: {
        type: String,
    },
    formula_evaluate: {
        type: Boolean,
    },
    formula_add_formula: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    modifiedAt: {
        type: Date,
        default: new Date(),
    },
});

// Add a pre-save middleware to set the question_position before saving
SurveySectionSchema.pre('save', async function (next) {
    if (!this.question_position || this.isNew) {
        const sectionExists = await this.constructor.exists({
            survey_key: this.survey_key,
            survey_section_key: this.survey_section_key,
        });

        if (sectionExists) {
            const lastInSection = await this.constructor.findOne({
                survey_key: this.survey_key,
                survey_section_key: this.survey_section_key,
            }).sort({ 'survey_questions_num': -1, 'question_position': -1 }).exec();

            if (lastInSection) {
                this.question_position = lastInSection.question_position + 1;
            } else {
                // No questions in this section yet, set position to 0
                this.question_position = 0;
            }

            // Update positions for questions outside the section
            await this.constructor.updateMany(
                {
                    survey_key: this.survey_key,
                    survey_section_key: { $ne: this.survey_section_key },
                    question_position: { $gte: lastInSection.question_position },
                },
                { $inc: { question_position: 1 } }
            ).exec();
        } else {
            // New section, find the last position across all sections for the given survey_key
            const lastPosition = await this.constructor.findOne({ survey_key: this.survey_key })
                .sort({ 'survey_questions_num': -1, 'question_position': -1 })
                .exec();

            if (lastPosition) {
                // Set question position to the next position after the last question
                this.question_position = lastPosition.question_position + 1;
            } else {
                // If there are no existing questions, set question position to 0
                this.question_position = 0;
            }
        }
    }

    next();
});

module.exports = mongoose.model('dd_survey_question', SurveySectionSchema);