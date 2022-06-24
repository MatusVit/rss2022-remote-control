import { Transform } from 'stream';

export class TransportStream extends Transform {
  _transform(chunk, encoding, cb) {
    console.log(`TransportStream chunk= ${chunk}`);
    // asyncHandler(chunk, cb);
    const newChunk = `${chunk}`;
    this.push(newChunk);
    cb();
  }
}
