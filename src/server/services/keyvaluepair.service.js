import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const writeFileAsync = promisify(fs.writeFile)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class KeyValuePairService {
    constructor(filePath) {
        this.filePath = path.join(__dirname, filePath)
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify({}))
        }
        this.data = this.readDataFromFile()
        this.queue = Promise.resolve() // Initialize the queue
    }

    readDataFromFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8')
            return JSON.parse(data)
        } catch (err) {
            console.error('Error reading file from disk:', err)
            return {}
        }
    }

    save(key, value) {
        this.data[key] = value

        // Add the write operation to the queue
        this.queue = this.queue
            .then(() => writeFileAsync(this.filePath, JSON.stringify(this.data, null, 2)))
            .then(() => console.log('Successfully wrote to file'))
            .catch(err => console.error('Error writing file', err))
    }

    get(key) {
        return this.data[key]
    }
}

export default KeyValuePairService