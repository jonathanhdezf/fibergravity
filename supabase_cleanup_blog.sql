-- SCRIPTS PARA ELIMINAR EL SISTEMA DE BLOG DE LA BASE DE DATOS (SUPABASE)
-- Ejecuta estos comandos en el SQL Editor de tu panel de Supabase para limpiar todo.

BEGIN;

-- 1. Eliminar Tablas (El orden importa por las referencias/foreign keys)
DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;

-- 2. Eliminar Funciones relacionadas
DROP FUNCTION IF EXISTS increment_post_views(text);

COMMIT;

-- Confirmación visual
SELECT 'Sistema de Blog eliminado correctamente' as status;
