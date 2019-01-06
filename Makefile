# === Sam shortcut
# next lines are autogenerated and any changes will be discarded after regenerating
CRYSTAL_BIN ?= `which crystal`
SAM_PATH ?= "sam.cr"
.PHONY: sam
sam:
	$(CRYSTAL_BIN) run $(SAM_PATH) -- $(filter-out $@,$(MAKECMDGOALS))
%:
	@:
# === Sam shortcut

setup:
	cp ./config/database.yml.example ./config/database.yml
