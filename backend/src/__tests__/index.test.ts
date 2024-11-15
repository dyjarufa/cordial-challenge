import { describe, expect, it } from '@jest/globals';
import express from 'express';

describe('express import', () => {
  it('should import express successfully', () => {
    expect(express).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof express).toBe('function');
  });

  it('should create an express application', () => {
    const app = express();
    expect(app).toBeDefined();
    expect(app.listen).toBeDefined();
    expect(app.use).toBeDefined();
    expect(app.get).toBeDefined();
    expect(app.post).toBeDefined();
  });

  it('should have request and response types', () => {
    const app = express();
    app.get('/', (req, res) => {
      expect(req).toBeDefined();
      expect(res).toBeDefined();
      expect(typeof res.send).toBe('function');
      expect(typeof res.status).toBe('function');
      res.send('test');
    });
  });
});
