// tracing.js
import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import  HttpInstrumentation  from '@opentelemetry/plugin-http';

export function setupTracing(serviceName) {
  const exporter = new JaegerExporter({
    serviceName: serviceName,
  });

  const tracerProvider = new NodeTracerProvider();
  tracerProvider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  tracerProvider.register();

  // Add instrumentation for outgoing HTTP requests
  tracerProvider.registerInstrumentation( HttpInstrumentation);

  return { tracerProvider, exporter };
}
