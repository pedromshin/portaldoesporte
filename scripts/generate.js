const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const resourceName = args[0];

if (!resourceName) {
  console.error('Please provide a resource name.');
  process.exit(1);
}
const servicePath = path.join('src', 'application', 'services', resourceName);
const entityPath = path.join('src', 'entities');

// Create the directories if they don't exist
if (!fs.existsSync(servicePath)) {
  fs.mkdirSync(servicePath, { recursive: true });
}
if (!fs.existsSync(entityPath)) {
  fs.mkdirSync(entityPath, { recursive: true });
}

// Generate the resource
const generateCommand = `nest g resource ${resourceName}`;
exec(generateCommand, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing command: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);

  // Read the generated service file
  const serviceFilePath = path.join(servicePath, `${resourceName}.service.ts`);
  fs.readFile(serviceFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    // Transform the content
    const transformedContent = `import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Create${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Dto } from './dto/create-${resourceName}.dto';
import { Update${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Dto } from './dto/update-${resourceName}.dto';
import { Model } from 'mongoose';
import { ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    } } from '@entities/${resourceName}.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Service {
    constructor(
        @InjectModel(${
          resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
        }.name) private readonly model: Model<${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }>,
    ) {}

    async create(create${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Dto: Create${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Dto): Promise<${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }> {
        try {
            return await this.model.create(create${
              resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
            }Dto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }[]> {
        try {
            return await this.model.find().exec();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(id: string): Promise<${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(
        id: string,
        update${
          resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
        }Dto: Update${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Dto,
    ): Promise<${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }> {
        try {
            const result = await this.model
                .findByIdAndUpdate(id, update${
                  resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
                }Dto, { new: true })
                .exec();
            if (!result) {
                throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
            }
            return result;
        } catch (error) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Error updating document' },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async remove(id: string) {
        try {
            return await this.model.deleteOne({ _id: id }).exec();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}`;

    // Write the transformed content back to the file
    fs.writeFile(serviceFilePath, transformedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err.message}`);
        return;
      }
      console.log(`Successfully transformed ${resourceName}.service.ts`);
    });

    // Update the controller file
    const controllerFilePath = path.join(
      servicePath,
      `${resourceName}.controller.ts`,
    );
    fs.readFile(controllerFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading controller file: ${err.message}`);
        return;
      }

      const transformedControllerContent = data
        .replace(
          new RegExp(
            `@Get\\(':id'\\)\\n {2}findOne\\(@Param\\('id'\\) id: string\\) {\\n {4}return this\\.${resourceName}Service\\.findOne\\(\\+id\\);`,
          ),
          `@Get(':id')\n  findOne(@Param('id') id: string) {\n    return this.${resourceName}Service.findOne(id);`,
        )
        .replace(
          new RegExp(
            `@Patch\\(':id'\\)\\n {2}update\\(@Param\\('id'\\) id: string, @Body\\(\\) update${capitalize(
              resourceName,
            )}Dto: Update${capitalize(
              resourceName,
            )}Dto\\) {\\n {4}return this\\.${resourceName}Service\\.update\\(\\+id, update${capitalize(
              resourceName,
            )}Dto\\);`,
          ),
          `@Patch(':id')\n  update(@Param('id') id: string, @Body() update${capitalize(
            resourceName,
          )}Dto: Update${capitalize(
            resourceName,
          )}Dto) {\n    return this.${resourceName}Service.update(id, update${capitalize(
            resourceName,
          )}Dto);`,
        )
        .replace(
          new RegExp(
            `@Delete\\(':id'\\)\\n {2}remove\\(@Param\\('id'\\) id: string\\) {\\n {4}return this\\.${resourceName}Service\\.remove\\(\\+id\\);`,
          ),
          `@Delete(':id')\n  remove(@Param('id') id: string) {\n    return this.${resourceName}Service.remove(id);`,
        );

      function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      // Write the transformed controller content back to the file
      fs.writeFile(
        controllerFilePath,
        transformedControllerContent,
        'utf8',
        (err) => {
          if (err) {
            console.error(`Error writing controller file: ${err.message}`);
            return;
          }
          console.log(`Successfully updated ${resourceName}.controller.ts`);
        },
      );
    });

    // Update the module file
    const moduleFilePath = path.join(servicePath, `${resourceName}.module.ts`);
    fs.readFile(moduleFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading module file: ${err.message}`);
        return;
      }

      // Transform the module content
      const transformedModuleContent = `import { Module } from '@nestjs/common';
    import { ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Service } from './${resourceName}.service';
    import { ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Controller } from './${resourceName}.controller';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    } } from '@entities/${resourceName}.entity';
    import { ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Schema } from '@schemas/${resourceName}.schema';
    
    @Module({
      imports: [
        MongooseModule.forFeature([
          { name: ${
            resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
          }.name, schema: ${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      }Schema },
        ]),
      ],
      controllers: [${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      }Controller],
      providers: [${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      }Service],
    })
    export class ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    }Module {}`;

      // Write the transformed module content back to the file
      fs.writeFile(moduleFilePath, transformedModuleContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing module file: ${err.message}`);
          return;
        }
        console.log(`Successfully updated ${resourceName}.module.ts`);
      });
    });

    // ... (previous parts of the script remain the same)

    exec(generateCommand, (err, stdout, stderr) => {
      // ... (error handling and previous file modifications remain the same)

      // Create the schema file
      const schemaPath = path.join('src', 'schemas');
      if (!fs.existsSync(schemaPath)) {
        fs.mkdirSync(schemaPath, { recursive: true });
      }
      const schemaFilePath = path.join(schemaPath, `${resourceName}.schema.ts`);
      const schemaContent = `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      }Document = HydratedDocument<${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      }>;

@Schema()
export class ${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} {
@Prop()
name: string;
}

export const ${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      }Schema = SchemaFactory.createForClass(${
        resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
      });`;

      fs.writeFile(schemaFilePath, schemaContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing schema file: ${err.message}`);
          return;
        }
        console.log(`Successfully created ${resourceName}.schema.ts`);
      });

      // ... (entity file creation and other parts remain the same)
    });

    // Create the entity file
    const entityFilePath = path.join(entityPath, `${resourceName}.entity.ts`);
    const entityContent = `export class ${
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    } {
    name: string;
}`;

    fs.writeFile(entityFilePath, entityContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing entity file: ${err.message}`);
        return;
      }
      console.log(`Successfully created ${resourceName}.entity.ts`);
    });
  });
});

exec('npm run lint', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing lint: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
});
