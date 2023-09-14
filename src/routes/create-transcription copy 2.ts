import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function createTranscriptionRoute(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', async (req) => {
        // Check if the request has the correct Content-Type header
        if (req.headers['content-type'] !== 'application/json') {
            return {
                statusCode: 415,
                error: "Unsupported Media Type",
                message: "Request must have 'Content-Type' header set to 'application/json'."
            };
        }

        const paramsSchema = z.object({
            videoId: z.string().uuid()
        })
        const { videoId } = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            prompt: z.string()
        })

        // Parse the request body only if the content type is valid
        let parsedBody;
        try {
            parsedBody = bodySchema.parse(req.body)
        } catch (error) {
            return {
                statusCode: 400, // Bad Request
                error: "Invalid Request",
                message: "Invalid request body. Please provide a valid JSON object with a 'prompt' field."
            };
        }

        // Perform your transcription creation logic here

        return {
            videoId,
            prompt: parsedBody.prompt
        };
    })
}
