# Modified Instructions for TypeScript Entity File Refinement

## Reminder
- Follow these instructions **exactly** as written without any additional changes.

## Revised Guidelines

### 1. **Number and Numeric Types**
   - **Use**: `number` for numeric `columnType`.
   - **Examples**:
     1. Before: `@Property({ columnType: 'integer' }) age: string;`
        After: `@Property() age: number;`
     2. Before: `@Property({ columnType: 'float' }) salary: string;`
        After: `@Property() salary: number;`

### 2. **String Types**
   - **Use**: `string` for string `columnType`.
   - **Examples**:
     1. Before: `@Property({ columnType: 'varchar' }) name: any;`
        After: `@Property() name: string;`
     2. Before: `@Property({ columnType: 'text' }) address: any;`
        After: `@Property() address: string;`

### 3. **Nullable Properties**
   - **Remove**: `nullable: true`.
   - **Examples**:
     1. Before: `@Property({ nullable: true }) description?: string;`
        After: `@Property() description?: string;`
     2. Before: `@Property({ nullable: true }) email?: string;`
        After: `@Property() email?: string;`

### 4. **`createdAt` and `updatedAt` Properties**
   - **Set**: `defaultRaw` to `now()` and initialize with `new Date()`.
   - **Examples**:
     1. Before:
        ```typescript
        @Property({ length: 6, nullable: true, defaultRaw: `now()` })
        createdAt?: Date;
        ```
        After: 
        ```typescript
        [OptionalProps]?: 'createdAt';
        ...
        @Property()
        createdAt = new Date();
        ```
     2. Before:
        ```typescript
        @Property({ onUpdate: () => new Date() })
        updatedAt?: Date;
        ```
        After:
        ```typescript
        @Property({ onUpdate: () => new Date() })
        updatedAt = new Date();
        ```

### 5. **Default Value Properties**
   - **Specify**: Explicit default values, remove `?:`, add to `[OptionalProps]?:`.
   - **Examples**:
     1. Before:
        ```typescript
        @Property({ nullable: true, default: false })
        isFullUser?: boolean = false;
        ```
        After: 
        ```typescript
        [OptionalProps]?: 'isFullUser';
        ...
        @Property({ default: false })
        isFullUser = false;
        ```

### 7. **JSONB and Date Column Types**
   - **For `jsonb`**: Remove `columnType`, set type to `any`.
   - **For `date`**: Use `DateType` from `@mikro-orm/core`.
   - **Examples**:
     1. Before: `@Property({ columnType: 'jsonb' }) socials?: any;`
        After: `@Property() socials?: any;`
     2. Before: `@Property({ columnType: 'date' }) birthday?: Date;`
        After: `@Property({ type: DateType }) birthday?: Date;`

### 8. **UUID Primary Key**
   - **For primary keys**: Import `uuidv4` from `uuid`, set `defaultRaw` to `uuidv4()`, specify `columnType` as `UUID`.
   - **Examples**:
     1. Before:
        ```typescript
        @PrimaryKey({ columnType: 'uuid' })
        id!: string;
        ```
        After: 
        ```typescript
        import { v4 as uuidv4 } from 'uuid';
        ...
        [OptionalProps]?: 'id';
        ...
        @PrimaryKey({ columnType: 'UUID' }) 
        id = uuidv4();
        ```

### 9. **Geometry Column Type**
   - **Set**: TypeScript type to `Point` for `geometry`, import from `geojson`, remove `columnType`.
   - **Examples**:
     1. Before:
        ```typescript
        @Property({ columnType: 'geometry' })
        location!: unknown;
        ```
        After: 
        ```typescript
        import { Point } from 'geojson';
        ...
        @Property() 
        location: Point;
        ```

### 10. **Simplifying Relationships**
   - **Remove**: `entity` option for simple relationships.
   - **Keep**: Many-to-many relationships unchanged.
   - **Examples**:
     1. Before: `@ManyToOne({ entity: () => CardTypes }) cardType?: CardTypes;`
        After: `@ManyToOne() cardType?: CardTypes;`
     2. Before and After:
        ```typescript
        @ManyToMany({ entity: () => Cards, joinColumn: 'user_id', inverseJoinColumn: 'card_id' })
        activeCards = new Collection<Cards>(this);
        ```

### 11. **Initializer for Default Properties**
   - **Initialize**: Properties with default values appropriately.
   - **Examples**:
     1. Before:
        ```typescript
        @Property({ columnType: 'numeric(10,0)', nullable: true, defaultRaw: `0` })
        countQuiz?: string;
        ```
        After:
        ```typescript
        [OptionalProps]?: 'countQuiz';
        ...
        @Property({ defaultRaw: `0` })
        countQuiz = 0;
        ```

### 12. **Composite Primary Keys**
   - **Set**: `primary: true` for each property or relation in the composite key.
   - Adopt the following pattern illustrated by this before/after example:
   - **Examples**:
     1. Before:
        ```typescript
         [PrimaryKeyProp]?: 'blocker' | 'blocked';
         [PrimaryKeyType]?: [string, string];

         @ManyToOne({ entity: () => Users, primary: true })
         blocker!: Users;

         @ManyToOne({ entity: () => Users, primary: true })
         blocked!: Users;
        ```
        After: 
        ```typescript
         [PrimaryKeyProp]?: ['blocker', 'blocked'];

         @ManyToOne({ primary: true })
         blocker!: Users;

         @ManyToOne({ primary: true })
         blocked!: Users;
        ```

### Note
- Ensure properties are logically and conventionally ordered.
- **Do not include any comments** in the entity file unless they're absolutely necessary.

## Checklist for Compliance
- [ ] Followed each guideline exactly as written.
- [ ] Made no additional changes or comments.
- [ ] Ensured logical order of properties.
- [ ] Avoided unnecessary comments.

## Reminder
- Follow these instructions **exactly** as written without any additional changes.
- Ensure that imports for `PrimaryKeyProp` and `OptionalProps` are present and correct (they should already be in the original file).
