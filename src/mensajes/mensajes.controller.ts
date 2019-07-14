import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(
        private readonly mensajeService: MensajesService,
    ) { }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response: any) {
        this.mensajeService.createMensaje(createMensajeDto).then(mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la creación del mensaje' });
        });
    }

    @Get()
    getAll(@Res() response: any) {
        this.mensajeService.getAll().then(mensajeList => {
            response.status(HttpStatus.OK).json(mensajeList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la obtención de mensajes' });
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response: any, @Param('id') idMensaje: number) {
        this.mensajeService.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la edición del mensaje' });
        });
    }

    @Delete(':id')
    delete(@Res() response: any, @Param('id') idMensaje) {
        this.mensajeService.deleteMensaje(idMensaje).then(resp => {
            response.status(HttpStatus.OK).json(resp);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la eliminación del mensaje' });
        });
    }
}
