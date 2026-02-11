-- Add documentation fields to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ine_anverso TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ine_reverso TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS comprobante_domicilio TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS referencias_hogar TEXT;

-- Update existing leads with null values (optional, but good for clarity)
UPDATE leads SET ine_anverso = NULL WHERE ine_anverso IS NULL;
UPDATE leads SET ine_reverso = NULL WHERE ine_reverso IS NULL;
UPDATE leads SET comprobante_domicilio = NULL WHERE comprobante_domicilio IS NULL;
UPDATE leads SET referencias_hogar = NULL WHERE referencias_hogar IS NULL;
