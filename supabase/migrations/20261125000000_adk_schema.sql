-- Esquema para las tablas de sesiones de Google ADK (historial de conversaciones de Forzecito).
-- No se expone por el Data API: solo el backend (rol postgres vía pooler) lo usa.
create schema if not exists adk;
revoke all on schema adk from anon, authenticated;
alter default privileges in schema adk revoke all on tables from anon, authenticated;
